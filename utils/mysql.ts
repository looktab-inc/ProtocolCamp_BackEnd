import mysql from 'mysql';

const user = process.env.DB_USER;
const password = process.env.DB_PW;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

function mysqlQuery(query: string, callback: (data: any) => void) {
  const connection = mysql.createConnection(
    `mysql://${user}:${password}@${host}:${port}/${database}`
  );
  connection.connect();
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
  connection.end();
}

const mysqlQueryPromise = (query: string): Promise<any[]> => {
  return new Promise((res, rej) => {
    mysqlQuery(query, (data) => {
      if (data) res(data);
      else rej(null);
    });
  });
};

export default mysqlQueryPromise;
