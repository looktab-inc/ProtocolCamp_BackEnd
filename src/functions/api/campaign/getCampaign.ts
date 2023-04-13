import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';

const getCampaign = async (req: Request, res: Response) => {
  const address = req.params.address;

  if (!address) {
    return res.status(400).send(responseMsg[400]);
  }

  return res.send(`GET /api/Campaign/${address}`);
};

export default getCampaign;
