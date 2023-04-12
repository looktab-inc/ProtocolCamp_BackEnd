import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import apiRouter from './router/api';

const app: Express = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to express server based typescript!');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
