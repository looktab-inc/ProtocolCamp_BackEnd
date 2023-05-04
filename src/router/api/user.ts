import express, { Request, Response, Router } from 'express';
import { getBalance } from '../../functions/api/user/getBlance';
import { createUser } from '../../functions/api/user/createUser';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.send('This is /api/user Root');
});

router.get('/getbalance/:pubkey', async (req: Request, res: Response) => {
  return await getBalance(req, res);
});

router.post('/newuser', async (req: Request, res: Response) => {
  return await createUser(req, res);
});

export default router;
