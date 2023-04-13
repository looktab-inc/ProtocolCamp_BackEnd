import { Request, Response } from 'express';
const getStore = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).send('Bad Request');
  return res.send(`GET /api/store/${address}`);
};

export default getStore;
