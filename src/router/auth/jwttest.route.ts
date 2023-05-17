import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import apiAuth from '../../../utils/auth/apikeyCheck';
import { responseMsg } from '../../../utils/responseMsg';
// import dotenv from 'dotenv';

const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  // exception handling : invalid api-key
  const validateKeyRes = apiAuth(req);
  if (!validateKeyRes) return res.status(401).send(responseMsg[401]);

  if (JWT_SECRET)
    res.send(jwt.sign({ email: 'test@asdf' }, JWT_SECRET, { expiresIn: 6000 }));
  else res.status(500).send('internal error : No JWT_SECRET');
});

export default router;
