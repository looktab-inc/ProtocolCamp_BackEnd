import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import {
  createRecord,
  findRecord,
  updateRecord,
} from "../../../../utils/queryModules";

export default async function (req: Request, res: Response) {
  const { store_id, user_id, recDataId } = req.body;

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

    // IMG upload Logic
    const imgUrl = "hththth";

    // NFT Mint Logic
    const nft_address = "0x1234";

    // create record
    const db_create_res = await createRecord({
      table: "Like",
      data: {
        user_id,
        store_id,
        nft_address,
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
