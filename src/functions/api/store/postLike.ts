import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import {
  createRecord,
  findRecord,
  updateRecord,
} from '../../../../utils/queryModules';
import { Wallet, web3 } from '@project-serum/anchor';
import { TinjiNft } from '../../../../utils/contract/tinjiNft';
import solanaClusterRPCEndpoints from '../../../../utils/solanaClusterRPCEndpoints';
import { getTinjiProgram, getTinjiProvider } from '../../../../utils/contract/contractConfig';
import { TinjiContract } from '../../../../utils/contract/tinjiContract';
import * as umilib from "@metaplex-foundation/umi";
import * as fs from "fs";

export default async function (req: Request, res: Response) {
  const { store_id, user_id, recDataId } = req.body;
  const bankSecret = process.env.BANK_SECRET_KEY;

  // exception handling : Bad Request
  if (!(store_id && user_id && recDataId))
    return res.status(400).send(responseMsg[400]);

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

    if (bankSecret != undefined) {
      const bankKeypair = web3.Keypair.fromSecretKey(
        Uint8Array.from(bankSecret.split(",").map(e=>Number(e)))
      );
      console.log(`bankKeypair Public Key: ${bankKeypair.publicKey}`);
  
      if(db_read_res.secret_key == null || undefined) {
        console.log(`User Name '${db_read_res.username}' : can not find wallet info.`);
        return res.status(500).send('Internal Error');
      } else if(db_read_res.secret_key.length !== 88) {
        console.log(`User Name '${db_read_res.username}' : something wrong with key size.`);
        return res.status(500).send('Internal Error');
      } else {
        const tinjiNft = new TinjiNft(solanaClusterRPCEndpoints.devnet, bankKeypair);
        const clientKeypair = web3.Keypair.fromSecretKey(db_read_res.secret_key);
        const clientKeypairSigner = tinjiNft.generateSignerKeypair(clientKeypair);
        console.log(`User Name '${db_read_res.username}' : publicKey = ${clientKeypair.publicKey.toString()}`);
    
    
        // 1. upload File
        const filePath = "utils/contract/files/";
        const fileName = "0.png";
        const fileBuf = fs.readFileSync(filePath + fileName);
        const fileUri = await tinjiNft.uploadFile(fileBuf,fileName);
        console.log(`File Uri : ${fileUri}`);
    
        // 2. upload Metadate
        const metadataName = "Test Metadata";
        const metadataUri = await tinjiNft.uploadMetadata([fileUri], metadataName);
        console.log(`Metadata Uri : ${metadataUri}`);
    
        // 3. mint NFT
        const mintedNftSigner = await tinjiNft.mintNft(clientKeypairSigner, metadataUri);
        const mintedNftAddress = umilib.base58PublicKey(mintedNftSigner.publicKey);
        console.log(`Minted NFT Address : `);
        console.log(mintedNftAddress);

        // 4. deposit into Contract

        // create record
        const db_create_res = await createRecord({
          table: "Like",
          data: {
            user_id,
            store_id,
            mintedNftAddress,
          },
        });

        const db_update_res = await updateRecord({
          table: "Users",
          data: { like_count: db_read_res.like_count + 1 },
          where: { id: user_id },
        });
      }
    }

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
