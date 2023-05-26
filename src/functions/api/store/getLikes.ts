import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function getLikes(req: Request, res: Response) {
  const user_id = req.params.userId;
  if (!user_id) return res.status(400).send(responseMsg[400]);

  const likeList = await findRecord({
    table: "Like",
    data: { user_id: user_id },
  });

  const response = await Promise.all(
    likeList.map(async (e) => {
      const [storeInfo] = await findRecord({
        table: "Store",
        data: { id: e.store_id },
      });
      const res = new Object({
        id: e.id,
        user_id: e.user_id,
        nft_address: e.nft_address,
        storeInfo,
      });

      return res;
    })
  );

  console.log(response);
  return res.send(response);
}
