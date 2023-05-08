import { Request, Response } from 'express';
import { findRecord } from '../../../../utils/queryModules';

export const getUsername = async (req: Request, res: Response) => {
  const username = req.params.username;

  // exception handling : no param
  if (!username) return res.status(400).send('Bad Request');

  try {
    const findRes = await findRecord({ table: 'Users', data: { username } });

    if (findRes.length !== 0) return res.status(200).send({ available: false });
    else return res.status(200).send({ available: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal Error');
  }
};
