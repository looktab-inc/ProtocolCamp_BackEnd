import { createForm, findForm } from '../interface/queryCreate';
import mysqlQueryPromise from './mysql';

const findRecord = async (data: findForm): Promise<any[]> => {
  const res = await mysqlQueryPromise(
    `select * from ${data.table} where ${Object.keys(data.data).join(
      ' '
    )}='${Object.values(data.data).join(' ')}'`
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
    await mysqlQueryPromise(
      `insert into ${data.table} (${keys.join(',')}) value (${values
        .map((el) => {
          if (typeof el === 'string') return `'${el}'`;
          if (typeof el === 'number') return el;
        })
        .join(',')});`
    );
    const res = await mysqlQueryPromise(
      `select * from ${data.table} where ${Object.entries(data.data)
        .map((e): string | any => {
          if (typeof e[1] === 'string') return `${e[0]}='${e[1]}'`;
          else if (typeof e[0] === 'number') return `${e[0]}=${e[1]}`;
        })
        .join(' && ')}`
    );
    return res[0];
  } catch (err) {
    return [];
  }
};

export { findRecord, createRecord };
