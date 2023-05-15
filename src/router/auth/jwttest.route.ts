import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  if (JWT_SECRET)
    res.send(jwt.sign({ email: 'test@asdf' }, JWT_SECRET, { expiresIn: 6000 }));
  else res.send('internal error : No JWT_SECRET');
});

export default router;
