import express, { Request, Response, Router } from 'express';
import { getBalance } from '../../functions/api/user/getBlance';
import { createUser } from '../../functions/api/user/createUser';
import { getUsername } from '../../functions/api/user/getUsername';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.send('This is /api/user Root');
});

// GET
router.route('/sol/:email').get(getBalance);
router.route('/username/:username').get(getUsername);

// POST
router.route('/newuser').post(createUser);

export default router;
