import { createForm, getUserForm } from '../interface/queryCreate';
import mysqlQueryPromise from './mysql';

const findRecord = async (data: getUserForm): Promise<any[]> => {
  const res = await mysqlQueryPromise(
    `select * from ${data.table} where ${data.column.join(
      ' '
    )}='${data.value.join(' ')}'`
  );
  if (res.length != 0) return res;
  return [];
};

/**
 *
 * @param data {table : string, data:{column, value}}
 * @returns
 */
const createRecord = async (data: createForm): Promise<any[]> => {
  const keys = Object.keys(data.data);
  const values = Object.values(data.data);
  if (keys.length != values.length)
    throw new Error(`Columns and Values are not matching`);

  try {
    await mysqlQueryPromise(
      `insert into ${data.table} value (${Object.values(data.data)
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
