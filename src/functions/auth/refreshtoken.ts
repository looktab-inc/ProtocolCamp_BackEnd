import { Request, Response } from "express";
import { responseMsg } from "../../../utils/responseMsg";
import { checkRefreshToken } from "../../../utils/auth/jwt";

export default async function refreshToken(req: Request, res: Response) {
  const token = req.query.token;
  if (!token) return res.status(400).send(responseMsg[400]);

  const result = checkRefreshToken(String(token));
  if (!result.status) return res.status(401).send(result.message);
  return res.status(200).send(result);
}
