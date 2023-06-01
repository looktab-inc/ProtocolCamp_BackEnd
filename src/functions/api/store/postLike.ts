import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import {
  createRecord,
  findRecord,
  updateRecord,
} from "../../../../utils/queryModules";
import { web3 } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { TinjiNft } from "../../../../utils/contract/tinjiNft";
import solanaClusterRPCEndpoints from "../../../../utils/solanaClusterRPCEndpoints";
import {
  getTinjiProgram,
  getTinjiProvider,
} from "../../../../utils/contract/contractConfig";
import { TinjiContract } from "../../../../utils/contract/tinjiContract";
import * as umilib from "@metaplex-foundation/umi";
import * as fs from "fs";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import mysqlQueryPromise from "../../../../utils/mysql";

export default async function (req: Request, res: Response) {
  const { store_id, user_id, recDataId } = req.body;
  const bankSecret = process.env.BANK_SECRET_KEY;

  // exception handling : Bad Request
  if (!(store_id && user_id && recDataId))
    return res.status(400).send(responseMsg[400]);

  if (!bankSecret) return res.status(500).send(responseMsg[500]);

  try {
    // RecData load
    const [recData] = await findRecord({
      table: "RecommendData",
      data: { id: recDataId },
    });

    // user data load
    const [db_read_res] = await findRecord({
      table: "Users",
      data: { id: user_id },
    });

    const bankKeypair = web3.Keypair.fromSecretKey(
      Uint8Array.from(bankSecret.split(",").map((e) => Number(e)))
    );
    const userSecrectString: string = db_read_res.secret_key;
    if (!userSecrectString || userSecrectString.length !== 88) {
      console.log(
        `User Name '${db_read_res.username}' : can not find wallet info.`
      );
      return res.status(500).send("Internal Error");
    }

    // Tinji NFT
    const tinjiNft = new TinjiNft(
      solanaClusterRPCEndpoints.devnet,
      bankKeypair
    );
    const clientKeypair = web3.Keypair.fromSecretKey(
      bs58.decode(userSecrectString)
    );
    const clientKeypairSigner = tinjiNft.generateSignerKeypair(clientKeypair);
    console.log(
      `User Name '${
        db_read_res.username
      }' : publicKey = ${clientKeypair.publicKey.toString()}`
    );

    // 1. upload File
    // const imgFilePath = recData.img1;
    // const temp = imgFilePath.split("/");
    // const fileName = temp[temp.length - 1];
    // console.log(`[ file Name ]`);
    // console.log(fileName);

    // const fileBuf = fs.readFileSync(imgFilePath);
    // const fileUri = await tinjiNft.uploadFile(fileBuf, fileName);
    // console.log(`[ File Uri ]`);
    // console.log(fileUri);

    // 1. img1 URL DB 값으로
    const fileUri = recData.img1;

    // 2. upload Metadate
    const metadataName = "Test Metadata";
    const metadataUri = await tinjiNft.uploadMetadata([fileUri], metadataName);
    console.log(`[ Metadata Uri ]`);
    console.log(metadataUri);

    // 3. mint NFT
    const mintedNftSigner = await tinjiNft.mintNft(
      clientKeypairSigner,
      metadataUri
    );
    const nft_address = umilib.base58PublicKey(mintedNftSigner.publicKey);
    console.log(`[ Minted NFT Address ]`);
    console.log(nft_address);

    // 4. deposit into Contract
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

    const selectBankAccountQuery = `select * from BankAccount limit 1;`;
    const [bankAccountData] = await mysqlQueryPromise(selectBankAccountQuery);
    let bankAccountAddress = "";
    if(bankAccountData == null || bankAccountData == undefined) {
      const bankAccountKeypair = web3.Keypair.generate();
      await tinjiContract.initializeContract(bankAccountKeypair);
      const insertBankAccountQuery = `insert into BankAccount (account_address) values('${bankAccountKeypair.publicKey.toString()}')`;
      await mysqlQueryPromise(insertBankAccountQuery);

      bankAccountAddress = bankAccountKeypair.publicKey.toString();
    } else {
      bankAccountAddress = bankAccountData.account_address;
    }

    const txSig = await tinjiContract.depositForNFT(
      new web3.PublicKey(bankAccountAddress)
    );

    const plusDepositQuery = `update BankAccount SET deposit_count = deposit_count + 1 where account_address = '${bankAccountAddress}'`;
    const plusResult = await mysqlQueryPromise(plusDepositQuery);

    // create record
    const db_create_res = await createRecord({
      table: "Like",
      data: {
        user_id,
        store_id,
        nft_address,
        rec_data_id: recDataId,
      },
    });

    const db_update_res = await updateRecord({
      table: "Users",
      data: { like_count: db_read_res.like_count + 1 },
      where: { id: user_id },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Error");
  }

  try {
    const [user] = await findRecord({
      table: "Users",
      data: { id: user_id },
    });
    const like_count = user.like_count;
    return res.status(200).send({
      status: "success",
      like_count,
    });
  } catch (e) {
    return res.status(500).send("Reading user data by user id failed");
  }
}
