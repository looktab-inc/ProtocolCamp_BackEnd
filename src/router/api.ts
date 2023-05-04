import express, { Router, Request, Response } from 'express';
import testRouter from './api/test';
import storeRouter from './api/store';
import campaignRouter from './api/campaign';
import user from './api/user';
import patchNfts from '../functions/api/nfts/patchNfts';
import auth from './api/auth';

const router: Router = express.Router();

// API root
router.get('/', (req: Request, res: Response) => {
  res.send('This is API Root');
});

router.use('/test', testRouter);
router.use('/store', storeRouter);
router.use('/campaign', campaignRouter);
router.use('/nfts', patchNfts);
router.use('/user', user);
router.use('/auth', auth);

export default router;
