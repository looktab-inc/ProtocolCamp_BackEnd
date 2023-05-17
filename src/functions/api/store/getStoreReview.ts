import { Request, Response } from 'express';
import { responseMsg } from '../../../../utils/responseMsg';
import { findRecord } from '../../../../utils/queryModules';
export default async function (req: Request, res: Response) {
  const id = req.params.id;
  if (!id) return res.status(400).send(responseMsg[400]);

  const db_res = await findRecord({ table: 'Review', data: { store_id: id } });
  const data = db_res.map((r) => {
    return {
      store_id: r.store_id,
      user_id: r.user_id,
      content: r.content,
      img1: r.img1,
      img2: r.img2,
      img3: r.img3,
    };
  });

  res.send(data);
}
