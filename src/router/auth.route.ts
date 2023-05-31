import express, { Router } from "express";
import fs from "fs";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send("auth");
});

const routersDir = __filename.split(".")[0];
fs.readdirSync(routersDir)
  .filter((f) => f.indexOf(".") !== 0 && f.slice(-9) === ".route.js")
  .forEach((r) =>
    router.use(`/${r.split(".")[0]}`, require(`${routersDir}/${r}`).default)
  );

export default router;
