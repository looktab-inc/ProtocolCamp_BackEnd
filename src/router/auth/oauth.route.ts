import express, { Router } from 'express';
import { oauth } from '../../functions/auth/oauth';

const router: Router = express.Router();

router.route('/').get(oauth);

export default router;
