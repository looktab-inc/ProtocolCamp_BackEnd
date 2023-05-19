import express, { Router } from 'express';
import refreshToken from '../../functions/auth/refreshtoken';

const router: Router = express.Router();

router.route('/').get(refreshToken);

export default router;
