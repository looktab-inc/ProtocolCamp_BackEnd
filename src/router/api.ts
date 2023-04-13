import express, { Router, Request, Response } from 'express';
import testRouter from './api/test';
import storeRouter from './api/store';
import campaignRouter from './api/campaign';
import patchNfts from '../functions/api/nfts/patchNfts';

const router: Router = express.Router();

// API root
router.get('/', (req: Request, res: Response) => {
  res.send('This is API Root');
});

// test routing
router.use('/test', testRouter);
router.use('/store', storeRouter);
router.use('/campaign', campaignRouter);
router.use('/nfts', patchNfts);

export default router;
