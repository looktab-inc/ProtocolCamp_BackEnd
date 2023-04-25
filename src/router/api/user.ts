import express, { Request, Response, Router } from 'express';
import { getBalance } from '../../functions/api/user/getBlance';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('This is /api/user Root');
});

router.get('/getbalance/:pubkey', async (req: Request, res: Response) => {
  await getBalance(req, res);
});

export default router;
