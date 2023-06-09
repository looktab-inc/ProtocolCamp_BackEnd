import { createRecord, findRecord } from "./queryModules";

const rewardType = new Map();
rewardType.set(0, "Visit");
rewardType.set(1, "Recommend");

const VISITOR_AMOUNT = 80;
const RECOMMENDER_AMOUNT = 20;

/**
 *
 * @param recommender_user_id
 * @param visiter_user_id
 * @param like_id
 * @param amount
 * @returns
 */
export default async function (
  user_id: string,
  like_id: number,
  amount: number,
) {
  try {
    const time = new Date();
    const [like] = await findRecord({
      table: "Like",
      data: { id: like_id },
    });
    if (!like) throw "No matching Like";
    const [store] = await findRecord({
      table: "Store",
      data: { id: like.store_id },
    });
    if (!store) throw "No matching store";

    const user_db_res = await createRecord({
      table: "rewardLog",
      data: {
        user_id: user_id,
        comment: `${store.name} ${rewardType.get(0)} Reward`,
        amount: amount,
        date: `${time.getFullYear()}-${
          time.getMonth() + 1
        }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${
          time.getSeconds
        }`,
      },
    });

    return { user: user_db_res };
  } catch (e) {
    console.log(e);
    return null;
  }
}
