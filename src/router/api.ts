import express, { Router, Request, Response } from 'express';
import fs from 'fs';

const router: Router = express.Router();

// API root
router.get('/', (req: Request, res: Response) => {
  res.send('This is API');
});

const apiDir = __dirname + '/api';

// route '{filename}.route.ts' files to '/api/{filename}'
fs.readdirSync(apiDir)
  .filter((f) => f.indexOf('.') !== 0 && f.slice(-9) === '.route.ts')
  .forEach((r) => {
    router.use(`/${r.split('.')[0]}`, require(`${apiDir}/${r}`).default);
  });

export default router;
