import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
  return res.send('Ts + Node.js + Express server running');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
