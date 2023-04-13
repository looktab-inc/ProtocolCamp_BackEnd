import { Request, Response } from 'express';
const postCampaign = async (req: Request, res: Response) => {
  const {
    title,
    description,
    lat,
    lng,
    address,
    start_time,
    end_time,
    distance,
    nft_count,
    images,
  } = req.body;
  if (
    !title ||
    !description ||
    !lat ||
    !lng ||
    !address ||
    !start_time ||
    !end_time ||
    !distance ||
    !nft_count ||
    !images
  )
    return res.status(400).send('Bad Request');
  return res.send('GET /api/campaign');
};

export default postCampaign;
