import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { createRecord } from "../../../../utils/queryModules";

export default async function regRecData(req: Request, res: Response) {
  const { user_id, store_id, comment, img1, img2, img3, img4, img5 } = req.body;
  if (!(user_id && store_id && comment && img1))
    return res.status(400).send(responseMsg[400]);

  const db_res = await createRecord({
    table: "RecommendData",
    data: {
      user_id,
      store_id,
      comment,
      img1,
      img2,
      img3,
      img4,
      img5,
    },
  });

  return res.send(db_res);
}
