import { Request, Response } from 'express';
import { responseMsg } from '../../../utils/responseMsg';
import { validateGoogleCode } from '../../../utils/auth/google/validateCode';
import { findRecord } from '../../../utils/queryModules';
import { refreshJWT, signJWT } from '../../../utils/auth/jwt';

export default async function (req: Request, res: Response) {
  const provider = req.params.provider;
  const email = req.query.email;
  const accessToken = req.headers.authorization;

  if (!(provider && email && accessToken)) {
    return res.status(400).send(responseMsg[400]);
  }

  if (provider === 'google') {
    try {
      let validationRes;
      try {
        validationRes = await validateGoogleCode(accessToken);
      } catch (e) {
        throw 'Invalid AccessToken';
      }
      if (!validationRes.email) throw 'Invalid AccessToken';
      if (validationRes.email !== email) throw 'Accesstoken Does not Match';

      const [userData] = await findRecord({
        table: 'User',
        data: { email: validationRes.email },
      });

      const jwt = signJWT({ email: email, provider: 'google' });
      const refJWT = refreshJWT(jwt);

      const response = { user: {}, jwt, refreshToken: refJWT };

      // EXIST User
      if (userData) {
        response.user = userData;
      }

      return res.status(200).send(response);
    } catch (e) {
      return res.status(401).send(`${responseMsg[401]} : ${e}`);
    }
  }
  // else if(provider === 'apple'){}
  else return res.status(400).send(responseMsg[400]);
}
