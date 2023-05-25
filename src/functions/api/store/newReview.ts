import { Request, Response } from "express";
import { createRecord } from "../../../../utils/queryModules";
import { responseMsg } from "../../../../utils/responseMsg";

export default async function (req: Request, res: Response) {
  const store_id = req.params.id;
  const { user_id, content, img1, img2, img3 } = req.body;

  if (!(store_id && user_id && content))
    return res.status(400).send(responseMsg[400]);

  try {
    const db_res = await createRecord({
      table: "Review",
      data: {
        store_id,
        user_id,
        content,
        img1,
        img2,
        img3,
      },
    });

    // reward 주세여

    return res.status(201).send(db_res);
  } catch (e) {
    console.log(e);
    return res.status(500).send(responseMsg[500]);
  }
}
