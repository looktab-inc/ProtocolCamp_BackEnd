import express, { Router } from 'express';
import { googleJWT } from '../../functions/auth/googlejwt';

const router: Router = express.Router();

router.route('/').get(googleJWT);

export default router;
