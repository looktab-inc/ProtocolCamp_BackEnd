import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
import { findRecord } from '../../../../utils/queryModules';
const getStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send(responseMsg[400]);
  }
  // get store data by address
  const getStoreRes = await findRecord({ table: 'Store', data: { id } });
  if (!getStoreRes) return res.status(500).send('Error');
  if (getStoreRes.length === 0) return res.send(`No store with id ${id}`);

  return res.send(getStoreRes);
};

export default getStore;
