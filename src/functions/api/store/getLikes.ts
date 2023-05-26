import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function getLikes(req: Request, res: Response) {
  const user_id = req.params.userId;
  if (!user_id) return res.status(400).send(responseMsg[400]);

  const likeList = await findRecord({
    table: "Like",
    data: { user_id: user_id },
  });

  return res.send(likeList);
}
