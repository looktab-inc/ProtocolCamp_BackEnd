import { Request, Response } from "express";
import {
  createRecord,
  findRecord,
  updateRecord,
} from "../../../../utils/queryModules";
import { responseMsg } from "../../../../utils/responseMsg";

export default async function (req: Request, res: Response) {
  const { user_id, content, img1, img2, img3, like_id, summary } = req.body;

  if (!(user_id && content && like_id && summary))
    return res.status(400).send(responseMsg[400]);

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

    const nft_address = likeData.nft_address;

    // 여기에 withdraw logic

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
