import { Request, Response } from "express";
import { createRecord, findRecord } from "../../../../utils/queryModules";
import { responseMsg } from "../../../../utils/responseMsg";

export default async function (req: Request, res: Response) {
  const store_id = req.params.id;
  const { user_id, content, img1, img2, img3, like_id, summary } = req.body;

  if (!(store_id && user_id && content && like_id && summary))
    return res.status(400).send(responseMsg[400]);

  try {
    const [likeData] = await findRecord({
      table: "Like",
      data: { id: like_id },
    });

    const [userData] = await findRecord({
      table: "Users",
      data: { id: user_id },
    });

    const nft_address = likeData.nft_address;

    // 여기에 withdraw logic

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
