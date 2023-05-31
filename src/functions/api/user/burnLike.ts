import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";
import { web3 } from "@project-serum/anchor";
import { TinjiNft } from "../../../../utils/contract/tinjiNft";
import solanaClusterRPCEndpoints from "../../../../utils/solanaClusterRPCEndpoints";
import bs58 from "bs58";
import * as umilib from "@metaplex-foundation/umi";
import { getTinjiProgram, getTinjiProvider } from "../../../../utils/contract/contractConfig";
import { TinjiContract } from "../../../../utils/contract/tinjiContract";
import * as anchor from "@project-serum/anchor";
import mysqlQueryPromise from "../../../../utils/mysql";
import rewardLog from "../../../../utils/rewardLog";

export default async function burnLike(req: Request, res: Response) {
  try {
    const likeId = req.params.like_id;
    if (!likeId) return res.status(400).send(responseMsg[400]);

    const bankSecret = process.env.BANK_SECRET_KEY;
    if (!bankSecret) return res.status(500).send(responseMsg[500]); 

    const [likeData] = await findRecord({
      table: "Like",
      data: { id: likeId },
    });
    if (!likeData) throw "No matching Like data";

    const userId = likeData.user_id;
    const [userData] = await findRecord({
      table: "Users",
      data: { id: userId },
    });
    if (!userData) throw "No matching User";

    const nftAddress = likeData.nft_address;
    // const pubKey = userData.public_key;
    const userSecretKey = userData.secret_key;

    // burn logic
    // generate Signer
    const bankKeypair = web3.Keypair.fromSecretKey(
      Uint8Array.from(bankSecret.split(",").map((e) => Number(e)))
    );
    const userSecrectString: string = userSecretKey;
    if (!userSecrectString || userSecrectString.length !== 88) {
      console.log(
        `User Name '${userData.username}' : can not find wallet info.`
      );
      return res.status(500).send("Internal Error");
    }

    // create TinjiNft Object
    const tinjiNft = new TinjiNft(
      solanaClusterRPCEndpoints.devnet,
      bankKeypair
    );
    const userKeypair = web3.Keypair.fromSecretKey(
      bs58.decode(userSecrectString)
    );
    const userKeypairSigner = tinjiNft.generateSignerKeypair(userKeypair);
    console.log(
      `User Name '${
        userData.username
      }' : publicKey = ${userKeypairSigner.publicKey.toString()}`
    );

    // burn NFT owned by user.
    console.log(`[ NFT address ]`);
    console.log(nftAddress);
    console.log(`[ User Pubkey ]`);
    console.log(userKeypair.publicKey.toString());
    await tinjiNft.burnNft(umilib.publicKey(nftAddress));

    // create TinjiContract Object
    const tinjiProvider = await getTinjiProvider(
      new anchor.Wallet(bankKeypair),
      solanaClusterRPCEndpoints.devnet
    );
    const tinjiProgram = await getTinjiProgram(tinjiProvider);
    const tinjiContract = new TinjiContract(
      tinjiProvider,
      tinjiProgram,
      bankKeypair
    );

    // select BankAccount from `BankAccount` table
    const selectBankAccountQuery = `select * from BankAccount where deposit_count > withdraw_count limit 1;`;
    const [bankAccountData] = await mysqlQueryPromise(selectBankAccountQuery);
    let bankAccountAddress;
    if(bankAccountData == null || bankAccountData == undefined) {
      console.log("There are no bankAccounts that have enough deposits");
      return res.status(500).send("Internal Error");
    } else {
      bankAccountAddress = new web3.PublicKey(bankAccountData.account_address);
    }

    console.log("[ before Balance ]");
    console.log(`User balance : ${await tinjiProvider.connection.getBalance(userKeypair.publicKey)}`);

    // withdraw Rewards From TinjiContract
    const txString = await tinjiContract.withdrawForBurned(
      bankAccountAddress, 
      userKeypair.publicKey
    );
    console.log(txString);
    console.log("[ after Balance ]");
    console.log(`User balance : ${await tinjiProvider.connection.getBalance(userKeypair.publicKey)}`);

    const rewardLogData = await rewardLog(userId, likeData.id, 10);
    console.log("[ Reward Log Data ]");
    console.log(rewardLogData);

    const plusWithdrawQuery = `update BankAccount SET withdraw_count = withdraw_count + 1 where account_address = '${bankAccountAddress}'`;
    const plusResult = await mysqlQueryPromise(plusWithdrawQuery);

    return res.status(200).send({
      status: "success"
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(`${responseMsg[500]} : ${e}`);
  }
}
