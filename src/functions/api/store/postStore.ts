import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
import { createRecord } from '../../../../utils/queryModules';
import { generateCode } from '../../../../utils/generateCode';
const postStore = async (req: Request, res: Response) => {
  const {
    name,
    description,
    address,
    nft_address,
    how_to_reach,
    latitude,
    longitude,
    open_time,
    close_time,
    close_days,
    image,
  } = req.body;

  // request body validation check
  if (
    !(
      name &&
      description &&
      address &&
      nft_address &&
      image &&
      latitude &&
      longitude &&
      open_time &&
      close_time
    )
  ) {
    return res.status(400).send(responseMsg[400]);
  }

  try {
    const db_res = await createRecord({
      table: 'Store',
      data: {
        id: await generateCode(),
        name,
        description,
        address,
        nft_address,
        how_to_reach,
        latitude,
        longitude,
        open_time,
        close_time,
        close_days,
        image,
      },
    });

    const result = {
      name: db_res.name,
      description: db_res.description,
      address: db_res.address,
      how_to_reach: db_res[how_to_reach],
      lat: db_res.latitude,
      lng: db_res.longitude,
      open_time: db_res.open_time,
      close_time: db_res.close_time,
      close_days: db_res.close_days,
    };

    return res.status(201).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error');
  }
};

export default postStore;
