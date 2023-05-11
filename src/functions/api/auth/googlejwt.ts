import { Request, Response } from 'express';
import getAccessToken from '../../../../utils/auth/google/getAccessToken';
import dotenv from 'dotenv';
import getUserInfo from '../../../../utils/auth/google/getUserInfo';
import { signJWT } from '../../../../utils/auth/JWT';
dotenv.config();

export async function googleJWT(req: Request, res: Response) {
  try {
    const code = String(req.query.code);
    if (!code) return res.status(400).send('BAD RESQUEST');

    const googleAccessToken = await getAccessToken(code);

    const userData = await getUserInfo(googleAccessToken);

    const token = signJWT({ email: userData.email, provider: 'google' });

    return res.send(token);
  } catch (e) {
    return res.status(500).send('Internal Error');
  }
}
