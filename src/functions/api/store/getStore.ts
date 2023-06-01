import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
import mysqlQueryPromise from '../../../../utils/mysql';
const getStore = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) {
    return res.status(400).send(responseMsg[400]);
  }
  // get store data by address
  const getStoreRes = await mysqlQueryPromise(
    `select * from Store where name='${address}'`
  );
  if (!getStoreRes) return res.status(500).send('Error');
  return res.send(getStoreRes);
};

export default getStore;
