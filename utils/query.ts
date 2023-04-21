import mysqlQueryPromise from './mysql';
import { createRecord } from './queryModules';

const main = async () => {
  // const res = await mysqlQueryPromise(`select * from Store`);
  const res = await createRecord({
    table: `Store`,
    data: {
      name: `545`,
      image: `a.jpg`,
      description: `test desc`,
      market_address: `rkdska`,
      open_time: `1200`,
      location_address: `rkdska`,
    },
  });
  console.log(res);
};

main();
