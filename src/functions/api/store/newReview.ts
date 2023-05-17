import { Request, Response } from 'express';
import { createRecord } from '../../../../utils/queryModules';
import { responseMsg } from '../../../../utils/responseMsg';

export default async function (req: Request, res: Response) {
  const d = req.body;
  console.log(d);
  const store_id = d.store_id;
  const user_id = d.user_id;
  const content = d.content;
  const img1 = d.img1 || 'NULL';
  const img2 = d.img2 || 'NULL';
  const img3 = d.img3 || 'NULL';

  if (!(store_id && user_id && content))
    return res.status(400).send(responseMsg[400]);

  const db_res = await createRecord({
    table: 'Review',
    data: {
      store_id,
      user_id,
      content,
      img1,
      img2,
      img3,
    },
  });
  console.log(db_res);

  res.send('good');
}
