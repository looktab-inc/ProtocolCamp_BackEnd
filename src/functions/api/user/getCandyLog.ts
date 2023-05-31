import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function (req: Request, res: Response) {
  const user_id = req.params.user_id;
  if (!user_id) return res.status(400).send(responseMsg[400]);

  const userLog = await findRecord({ table: "rewardLog", data: { user_id } });
  return res.send(userLog);
}
