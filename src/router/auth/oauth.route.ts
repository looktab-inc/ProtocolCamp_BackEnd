import express, { Router } from 'express';
import { oauth } from '../../functions/auth/oauth';
import oauthv2 from '../../functions/auth/oauthv2';

const router: Router = express.Router();

router.route('/').get(oauth);
router.route('/:provider').get(oauthv2);

export default router;
