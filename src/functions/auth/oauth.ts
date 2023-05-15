import { Request, Response } from 'express';
import { validateGoogleCode } from '../../../utils/auth/google/validateCode';
import { findRecord } from '../../../utils/queryModules';
import { signJWT } from '../../../utils/auth/jwt';
export async function oauth(req: Request, res: Response) {
  const { code, type } = req.query;
  if (!code || !type) return res.status(400).send('Bad Request');

  let userEmail = '';
  if (type === 'google') {
    const validationRes = await validateGoogleCode(String(code));
    if (validationRes) userEmail = validationRes.email;
  }
  /*
  else if(type === 'apple'){}
  */

  // Invalid OAuth code
  if (userEmail.length === 0) return res.status(401).send('Invalid oAuth Code');

  const [userData] = await findRecord({
    table: 'Users',
    data: { email: userEmail },
  });
  const jwt = signJWT({ email: userEmail, provider: type });

  // User data doesn't exist
  if (!userData) return res.send({ exist: false, jwt });

  // User data exists
  return res.send({
    exist: userData.length != 0,
    email: userData.email,
    user_id: userData.id,
    username: userData.username,
    jwt,
  });
}
