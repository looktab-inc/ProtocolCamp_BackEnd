import { Request, Response } from "express";
import { responseMsg } from "../../../../utils/responseMsg";
import { findRecord } from "../../../../utils/queryModules";

export default async function (req: Request, res: Response) {
  try {
    const like_id = req.params.like_id;
    if (!like_id) return res.status(400).send(responseMsg[400]);

    const [likeData] = await findRecord({
      table: "Like",
      data: { id: like_id },
    });
    if (!likeData) throw "No matching Like data";

    const user_id = likeData.user_id;
    const [userData] = await findRecord({
      table: "Users",
      data: { id: user_id },
    });
    if (!userData) throw "No matching User";

    const nftAddress = likeData.nft_Address;
    const pubKey = userData.public_key;
    const secKey = userData.secret_key;

    // burn logic

    return res.send("Burn Result");
  } catch (e) {
    console.log(e);
    return res.status(500).send(`${responseMsg[500]} : ${e}`);
  }
}
