import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";
import distance from "../../../../utils/calcDistance";

export default async function getRecList(req: Request, res: Response) {
  const userId = req.params.userId;
  const { lat, lng, range } = req.body;
  if (!(userId && lat && lng && range))
    return res.status(400).send(responseMsg[400]);

  let response = { store: new Array(0), like_count: 0 };

  const [userInfo] = await findRecord({ table: "Users", data: { id: userId } });
  if (userInfo.like_count >= 5) {
    response.like_count = userInfo.like_count;
    return res.send(response);
  }

  let stores = await findRecord({ table: "RecommendData" });

  const newstores: any[] = [];
  for (let i = 0; i < stores.length; i++) {
    const [storeInfo] = await findRecord({
      table: "Store",
      data: { id: stores[i].store_id },
    });
    const dist = distance(storeInfo.latitude, storeInfo.longitude, lat, lng);
    stores[i].distance = dist;
    stores[i].store_address = storeInfo.address;
    stores[i].store_name = storeInfo.name;
    if (dist < range) newstores.push(stores[i]);
  }

  let storesCnt = 5;
  const selectedStores = [];
  if (newstores.length < storesCnt) {
    response.store = newstores;
  } else {
    while (storesCnt-- !== 0) {
      selectedStores.push(
        ...newstores.splice(Math.floor(Math.random() * newstores.length), 1)
      );
    }
  }

  response.store = selectedStores;

  return res.send(response);
}
