import { Request, Response } from 'express';

const patchNfts = async (req: Request, res: Response) => {
  res.send('PATCH /api/nfts');
};

export default patchNfts;
