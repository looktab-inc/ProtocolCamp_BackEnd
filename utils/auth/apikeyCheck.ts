import { Request } from "express";
import uuidAPIKey from "uuid-apikey";
import dotenv from "dotenv";
dotenv.config();

export default function apiAuth(req: Request) {
  try {
    const apikey = req.headers.authorization;
    console.log(apikey);
    console.log(process.env.UUID);
    const keyRes = uuidAPIKey.check(apikey || "", process.env.UUID || "");
    const checkRes = !apikey || keyRes;
    return checkRes;
  } catch (e) {
    return false;
  }
}
