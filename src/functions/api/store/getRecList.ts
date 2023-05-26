import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function getRecList(req: Request, res: Response) {
  const userId = req.params.userId;
  if (!userId) return res.status(400).send(responseMsg[400]);

  let response = { store: [], like_count: 0 };

  const [userInfo] = await findRecord({ table: "Users", data: { id: userId } });
  if (userInfo.like_count >= 5) {
    response.like_count = userInfo.like_count;
    return res.send(response);
  }

  const shops = await findRecord({ table: "Store" });
}
