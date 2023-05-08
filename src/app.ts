import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';

dotenv.config();

import apiRouter from './router/api';
import apiAuth from '../utils/apikeyCheck';

const app: Express = express();
const PORT = 8000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authorization (api key from .env)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers['content-type'] ||
    req.headers['content-type'] !== 'application/json'
  )
    return res.status(400).send('Bad Request(Maybe not including api-key)');
  if (apiAuth(req)) {
    return res.status(401).send('Unauthorized');
  } else next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('TINJI API SERVER');
});

// API Router
app.use('/api', apiRouter);

// Handle Unknown
app.use((req, res, next) => {
  return res.sendStatus(404);
});

// Run
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
