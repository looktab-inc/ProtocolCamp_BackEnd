import { createRecord, findRecord } from "./queryModules";

const rewardType = new Map();
rewardType.set(0, "Visit");
rewardType.set(1, "Recommend");

export default async function (
  type: number,
  user_id: string,
  store_id: string,
  amount: number
) {
  try {
    const time = new Date();
    const [store] = await findRecord({
      table: "Store",
      data: { id: store_id },
    });
    if (!store) throw "No matching store";

    const db_res = await createRecord({
      table: "rewardLog",
      data: {
        user_id,
        comment: `${store.name} ${rewardType.get(type)} Reward`,
        amount,
        date: `${time.getFullYear()}-${
          time.getMonth() + 1
        }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${
          time.getSeconds
        }`,
      },
    });

    return db_res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
