import express, { Request, Response, Router } from 'express';
import { getUser } from '../../functions/api/user/getUser';

const router: Router = express.Router();

router.get('/', (req, res) => {
  res.send('auth');
});

router.route('/user').get(getUser);

export default router;
