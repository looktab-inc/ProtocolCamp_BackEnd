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

// If token is valid, return payload.
export const verifyJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (e) {
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
