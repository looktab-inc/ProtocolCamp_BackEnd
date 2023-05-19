import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const expireTime = '1d';
const refreshTime = '14d';

const JWT_SECRET = process.env.JWT_SECRET || '';

// get JWT and signiture
export const signJWT = (payload: object | string) => {
  const newJWT = jwt.sign(payload, JWT_SECRET, { expiresIn: expireTime });
  return newJWT;
};

// get JWT and signiture
export const refreshJWT = (payload: object | string) => {
  const refreshJWT = jwt.sign(payload, JWT_SECRET, { expiresIn: refreshTime });
  return refreshJWT;
};

// Get token from request header.
// If token is valid, return payload.
export const verifyJWT = (req: Request) => {
  const token = req.headers['authorization'];
  if (!token) return { status: false };

  try {
    const payload = jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) throw err.name;
      return data;
    });
    return { status: true, payload };
  } catch (e) {
    console.log(`${e} : ${token}`);
    return { status: false, code: e };
  }
};

// regenerate jwt and refresh token
export const checkRefreshToken = (token: string) => {
  try {
    const oldJWT = jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) throw err;
      return data;
    });
    const payload = jwt.decode(String(oldJWT)) || '';
    const newJWT = jwt.sign(payload, JWT_SECRET, { expiresIn: expireTime });
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: refreshTime,
    });
    return { jwt: newJWT, refreshToken: newRefreshToken };
  } catch (e) {
    return null;
  }
};
