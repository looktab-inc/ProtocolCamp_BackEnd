import { Request, Response } from "express";
import {
  createRecord,
  findRecord,
  updateRecord,
} from "../../../../utils/queryModules";
import { responseMsg } from "../../../../utils/responseMsg";
import { TinjiNft } from "../../../../utils/contract/tinjiNft";
import solanaClusterRPCEndpoints from "../../../../utils/solanaClusterRPCEndpoints";
import { web3 } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";
import { getTinjiProgram, getTinjiProvider } from "../../../../utils/contract/contractConfig";
import { TinjiContract } from "../../../../utils/contract/tinjiContract";
import mysqlQueryPromise from "../../../../utils/mysql";
import * as umilib from "@metaplex-foundation/umi";
import rewardLogs from "../../../../utils/rewardLogs";

export default async function (req: Request, res: Response) {
  const { user_id, content, img1, img2, img3, like_id, summary } = req.body;
  const bankSecret = process.env.BANK_SECRET_KEY;

  if (!(user_id && content && like_id && summary))
    return res.status(400).send(responseMsg[400]);

  if (!bankSecret) return res.status(500).send(responseMsg[500]);  

  try {
    const [likeData] = await findRecord({
      table: "Like",
      data: { id: like_id },
    });
    if (!likeData) throw "No matching like data";
    const store_id = likeData.store_id;

    const [userData] = await findRecord({
      table: "Users",
      data: { id: user_id },
    });

    const [recommendData] = await findRecord({
      table: "RecommendData",
      data: { store_id: likeData.store_id },
    });

    const visitorId = user_id;
    const recommenderId = recommendData.user_id;
    const [recommenderInfo] = await findRecord({
      table: "Users",
      data: { id: recommenderId },
    });
    const recommenderPubkey = new web3.PublicKey(recommenderInfo.public_key);
    console.log(`[ Recommender PubKey ]`);
    console.log(recommenderPubkey);

    const nftAddress = likeData.nft_address;

    // generate Signer
    const bankKeypair = web3.Keypair.fromSecretKey(
      Uint8Array.from(bankSecret.split(",").map((e) => Number(e)))
    );
    const visitorSecrectString: string = userData.secret_key;
    if (!visitorSecrectString || visitorSecrectString.length !== 88) {
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
    const visitorKeypair = web3.Keypair.fromSecretKey(
      bs58.decode(visitorSecrectString)
    );
    const visitorKeypairSigner = tinjiNft.generateSignerKeypair(visitorKeypair);
    console.log(
      `Visitor Name '${
        userData.username
      }' : publicKey = ${visitorKeypair.publicKey.toString()}`
    );

    // burn NFT owned by user for creating review that means verification of visit.
    console.log(`[ NFT address ]`);
    console.log(nftAddress);
    console.log(`[ Visitor Pubkey ]`);
    console.log(visitorKeypair.publicKey.toString());
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
    console.log(`Recommender balance : ${await tinjiProvider.connection.getBalance(recommenderPubkey)}`);
    console.log(`Visitor balance : ${await tinjiProvider.connection.getBalance(visitorKeypair.publicKey)}`);

    // withdraw Rewards From TinjiContract
    const txString = await tinjiContract.withdrawForVerified(
      bankAccountAddress, 
      visitorKeypair.publicKey, 
      recommenderPubkey
    );
    console.log(txString);
    console.log("[ after Balance ]");
    console.log(`Recommender balance : ${await tinjiProvider.connection.getBalance(recommenderPubkey)}`);
    console.log(`Visitor balance : ${await tinjiProvider.connection.getBalance(visitorKeypair.publicKey)}`);

    const rewardLogData = await rewardLogs(recommenderId, visitorId, like_id);
    console.log("[ Reward Log Data ]");
    console.log(rewardLogData);

    const plusWithdrawQuery = `update BankAccount SET withdraw_count = withdraw_count + 1 where account_address = '${bankAccountAddress}'`;
    const plusResult = await mysqlQueryPromise(plusWithdrawQuery);

    const db_update_res = await updateRecord({
      table: "Like",
      data: { visited: true },
      where: { id: like_id },
    });

    const db_res = await createRecord({
      table: "Review",
      data: {
        store_id,
        user_id,
        summary,
        content,
        img1,
        img2,
        img3,
      },
    });

    return res.status(201).send(db_res);
  } catch (e) {
    console.log(e);
    return res.status(500).send(responseMsg[500]);
  }
}
