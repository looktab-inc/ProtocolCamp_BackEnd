import express, { Router } from 'express';
import { getUser } from '../../functions/api/user/getUser';

const router: Router = express.Router();

router.route('/').get(getUser);

export default router;
