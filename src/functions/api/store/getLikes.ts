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
      const [recData] = await findRecord({
        table: "RecommendData",
        data: { id: e.rec_data_id },
      });
      const res = new Object({
        id: e.id,
        user_id: e.user_id,
        nft_address: e.nft_address,
        storeInfo,
        visited: e.visited,
        rec_data: {
          comment: recData.comment,
          img1: recData.img1,
          img2: recData.img2,
          img3: recData.img3,
          img4: recData.img4,
          img5: recData.img5,
        },
      });
      return res;
    })
  );
  return res.send(response);
}
