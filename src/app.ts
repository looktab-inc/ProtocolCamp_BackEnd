import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import apiRouter from './router/api';
import apiAuth from '../utils/apikeyCheck';
import { type } from 'os';

const app: Express = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers['content-type'] ||
    req.headers['content-type'] !== 'application/json'
  )
    return res.status(400).send('Bad Request');
  if (apiAuth(req)) {
    return res.status(401).send('Unauthorized');
  } else next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to express server based typescript!');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
