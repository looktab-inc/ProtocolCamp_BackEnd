import { Request } from "express";
import uuidAPIKey from "uuid-apikey";

export default function apiAuth(req: Request) {
  try {
    const apikey = req.headers.authorization;
    const keyRes = uuidAPIKey.check(apikey || "", process.env.UUID || "");
    const checkRes = !apikey || keyRes;
    return checkRes;
  } catch (e) {
    return false;
  }
}
