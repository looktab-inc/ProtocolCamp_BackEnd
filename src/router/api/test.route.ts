import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('This is /api/test Root');
});

router.get('/test', (req: Request, res: Response) => {
  res.send('You requested /api/test/test');
});

router.get('/test2', (req: Request, res: Response) => {
  res.send('You resquested /api/test/test2');
});

export default router;
