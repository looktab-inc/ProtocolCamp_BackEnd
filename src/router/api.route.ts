import express, { Router, Request, Response, NextFunction } from "express";
import fs from "fs";

const router: Router = express.Router();

// Authorization : API-key (api key from .env)
// import apiAuth from '../../utils/auth/apikeyCheck';
// router.use((req: Request, res: Response, next: NextFunction) => {
//   if (
//     !req.headers['content-type'] ||
//     req.headers['content-type'] !== 'application/json'
//   )
//     return res.status(400).send('Bad Request(Maybe not including api-key)');
//   if (apiAuth(req)) {
//     return res.status(401).send('Unauthorized');
//   } else next();
// });

// Authorization : JWT
import { verifyJWT } from "../../utils/auth/jwt";
router.use((req: Request, res: Response, next: NextFunction) => {
  const verificationRes = verifyJWT(req);
  if (verificationRes.status) next();
  else if (
    !verificationRes.status &&
    verificationRes.code === "TokenExpiredError"
  ) {
    return res.status(401).send("AccessTokenExpired");
  } else return res.status(401).send("Unauthorized");
});

const routersDir = __filename.split(".")[0];
const extension = __filename.split(".")[1];
fs.readdirSync(routersDir)
  .filter((f) => f.indexOf(".") !== 0 && f.slice(-9) === `.route.${extension}`)
  .forEach((r) =>
    router.use(`/${r.split(".")[0]}`, require(`${routersDir}/${r}`).default)
  );

export default router;
