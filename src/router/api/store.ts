import express, { Request, Response, Router } from 'express';

import postStore from '../../functions/api/store/postStore';
import getStore from '../../functions/api/store/getStore';
import patchStore from '../../functions/api/store/patchStore';

const router: Router = express.Router();

router.get('/:address', async (req: Request, res: Response) => {
  return await getStore(req, res);
});

router.post('/', async (req: Request, res: Response) => {
  return await postStore(req, res);
});

router.patch('/', async (req: Request, res: Response) => {
  return await patchStore(req, res);
});

export default router;
