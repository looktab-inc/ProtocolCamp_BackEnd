import express, { Router, Request, Response } from 'express';
import testRouter from './api/test';

const router: Router = express.Router();

// API root
router.get('/', (req: Request, res: Response) => {
  res.send('This is API Root');
});

// test routing
router.use('/test', testRouter);

export default router;
