import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import fs from "fs";
import cron from "node-cron";
import likeCountReset from "../cron/likeCountReset";

dotenv.config();

const app: Express = express();
const PORT = 8000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authorization (api key from .env)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (
//     !req.headers['content-type'] ||
//     req.headers['content-type'] !== 'application/json'
//   )
//     return res.status(400).send('Bad Request(Maybe not including api-key)');
//   if (apiAuth(req)) {
//     return res.status(401).send('Unauthorized');
//   } else next();
// });

app.get("/", (req: Request, res: Response) => {
  res.send("TINJI API SERVER");
});

// Load Routers
const routeDir = __dirname + "/router";
fs.readdirSync(routeDir)
  .filter((f) => f.indexOf(".") !== 0 && f.slice(-9) === ".route.js")
  .forEach((r) => {
    app.use(`/${r.split(".")[0]}`, require(`${routeDir}/${r}`).default);
  });

// Handle Unknown Request
app.use((req, res, next) => {
  return res.sendStatus(404);
});

// Run Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});

cron.schedule("0 0 * * *", async () => {
  await likeCountReset();
  console.log("All Like count has been reset");
});
