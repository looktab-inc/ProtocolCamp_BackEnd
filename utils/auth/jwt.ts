import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const expireTime = '12h';

const JWT_SECRET = process.env.JWT_SECRET || '';

// get JWT and signiture
export const signJWT = (payload: object | string) => {
  const newJWT = jwt.sign(payload, JWT_SECRET, { expiresIn: expireTime });
  return newJWT;
};

// Get token from request header.
// If token is valid, return payload.
export const verifyJWT = (req: Request) => {
  const token = req.headers['authorization'];
  if (!token) return false;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (Object.keys(payload).length !== 3) throw 'invalid token';
    return payload;
  } catch (e) {
    if (e === 'invalid token') console.log(e);
    return false;
  }
};

// Extend JWT expireTime
export const extendJWT = (token: string) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const payload = jwt.decode(token) || '';
    const newJWT = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
    return newJWT;
  } catch (e) {
    return null;
  }
};
