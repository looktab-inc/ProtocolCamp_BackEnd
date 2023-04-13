import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/errorMessage';

const getCampaign = async (req: Request, res: Response) => {
  const address = req.params.address;

  if (!address) {
    const code = 400;
    return res.status(code).send(responseMsg[code]);
  }
  return res.send(`GET /api/Campaign/${address}`);
};

export default getCampaign;
