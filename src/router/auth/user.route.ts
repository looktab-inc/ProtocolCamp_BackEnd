import express, { Router } from 'express';
import { getUser } from '../../functions/api/user/getUser';
import { getUsername } from '../../functions/api/user/getUsername';
import { createUser } from '../../functions/api/user/createUser';

const router: Router = express.Router();

// GET
router.route('/').get(getUser);

// POST

export default router;
