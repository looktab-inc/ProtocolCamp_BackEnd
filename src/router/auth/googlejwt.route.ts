import express, { Router } from 'express';
import { googleJWT } from '../../functions/api/auth/googlejwt';

const router: Router = express.Router();

router.route('/').get(googleJWT);

export default router;
