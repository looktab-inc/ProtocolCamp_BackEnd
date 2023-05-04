import { Request, Response } from 'express';
import { findRecord } from '../../../../utils/queryModules';

export const getUser = async (req: Request, res: Response) => {
  try {
    const [dbRes] = await findRecord({
      table: 'Users',
      data: { email: req.query.email },
    });
    if (dbRes.length !== 0)
      return res.send({
        exist: true,
        email: dbRes.email,
        username: dbRes.username,
      });
    else return res.send({ exist: false });
  } catch (e) {
    console.log(e);
  }
};
