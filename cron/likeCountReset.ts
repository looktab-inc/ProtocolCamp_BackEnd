import mysqlQueryPromise from "../utils/mysql";
import { updateRecord } from "../utils/queryModules";
export default async function likeCountReset() {
  const query = `select * from Users`;
  const queryRes = await mysqlQueryPromise(query);

  queryRes.forEach(
    async (e) =>
      await updateRecord({
        table: "Users",
        where: { id: e.id },
        data: { like_count: 0 },
      })
  );
}
