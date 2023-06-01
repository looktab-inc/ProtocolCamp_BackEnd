import mysqlQueryPromise from './mysql';

const main = async () => {
  const res = await mysqlQueryPromise(`select * from Store where name='123'`);
  console.log(res);
};

main();
