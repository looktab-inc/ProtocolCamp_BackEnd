import { createForm, findForm, updateForm } from "../interface/queryCreate";
import mysqlQueryPromise from "./mysql";

/**
 *
 * @param data {table : string, data:{column:value}}
 * @returns
 */
const findRecord = async (data: findForm): Promise<any[]> => {
  if (data.data === undefined) {
    const res = await mysqlQueryPromise(`select * from \`${data.table}\``);
    return res;
  }
  const res = await mysqlQueryPromise(
    `select * from \`${data.table}\` where ${Object.keys(data.data).join(
      " "
    )}='${Object.values(data.data).join(" ")}'`
  );
  if (res.length != 0) return res;
  return [];
};

/**
 *
 * @param data { data : {table : string, data : {}}}
 * @returns
 */
const createRecord = async (data: createForm): Promise<any> => {
  const keys = Object.keys(data.data);
  const values = Object.values(data.data);

  if (keys.length != values.length)
    throw new Error(`Columns and Values are not matching`);

  try {
    const query = `insert into \`${data.table}\` (${keys
      .filter((e) => values[keys.indexOf(e)] !== undefined)
      .join(",")}) values (${values
      .filter((e) => e !== undefined)
      .map((el) => {
        if (typeof el === "string") return `'${el}'`;
        if (typeof el === "number") return `${el}`;
      })
      .join(",")});`;

    await mysqlQueryPromise(query);
    const res = await mysqlQueryPromise(
      `select * from \`${data.table}\` where ${values
        .filter((e) => e !== undefined)
        .map((e) => {
          const idx = values.indexOf(e);
          if (typeof e === "number") {
            return `${keys[idx]}=${e}`;
          } else if (typeof e === "string") {
            return `${keys[idx]}='${e}'`;
          }
        })
        .join(` && `)}`
    );
    return res[0];
  } catch (err) {
    return [];
  }
};

const updateRecord = async (data: updateForm) => {
  try {
    const table = data.table;
    const updateData = data.data;
    const where = data.where;
    const query = `UPDATE \`${table}\` SET ${Object.entries(updateData).map(
      (e) => `${e[0]}=${typeof e[1] == "string" ? `'${e[1]}'` : e[1]}`
    )} WHERE ${Object.entries(where).map(
      (e) => `${e[0]}=${typeof e[1] == "string" ? `'${e[1]}'` : e[1]}`
    )}`;

    const queryRes = await mysqlQueryPromise(query);
    return queryRes;
  } catch (e) {
    console.log(e);
  }
};

export { findRecord, createRecord, updateRecord };
