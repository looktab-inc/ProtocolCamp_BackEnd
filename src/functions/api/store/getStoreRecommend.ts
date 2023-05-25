import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function storeRecommend(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) return res.status(400).send(responseMsg[400]);

  const shops = await findRecord({
    table: "RecommendData",
    data: { store_id: id },
  });

  let selected = [];
  const shopCntToRecommend = 5;
  if (shops.length > shopCntToRecommend) {
    for (let i = 0; i < shopCntToRecommend; i++)
      selected.push(shops.splice(Math.floor(Math.random() * shops.length), 1));
  } else {
    selected = [...shops];
  }
  return res.send({ recommendations: selected });
}
