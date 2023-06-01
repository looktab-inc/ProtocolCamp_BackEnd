import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
const patchStore = async (req: Request, res: Response) => {
  const {
    name,
    images,
    description,
    market_address,
    open_time,
    location_address,
  } = req.body;

  // request body validation check
  if (
    !name ||
    !images ||
    !description ||
    !market_address ||
    !open_time ||
    !location_address
  ) {
    return res.status(400).send(responseMsg[400]);
  }
  return res.send(`PATCH /api/store`);
};

export default patchStore;
