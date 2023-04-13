import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
const getStore = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) {
    return res.status(400).send(responseMsg[400]);
  }
  return res.send(`GET /api/store/${address}`);
};

export default getStore;
