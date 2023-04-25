import { Request } from 'express';
import uuidAPIKey from 'uuid-apikey';

export default function apiAuth(req: Request) {
  const apikey = req.headers.authorization;
  try {
    const checkRes =
      !apikey || !uuidAPIKey.check(apikey, process.env.UUID || '');
    return checkRes;
  } catch (e) {
    return true;
  }
}
