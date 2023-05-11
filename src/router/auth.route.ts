import express, { Router } from 'express';
import fs from 'fs';

const router: Router = express.Router();

const routersDir = __filename.split('.')[0];
fs.readdirSync(routersDir)
  .filter((f) => f.indexOf('.') !== 0 && f.slice(-9) === '.route.ts')
  .forEach((r) =>
    router.use(`/${r.split('.')[0]}`, require(`${routersDir}/${r}`).default)
  );

export default router;