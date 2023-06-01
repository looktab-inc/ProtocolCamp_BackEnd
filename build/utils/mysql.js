"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const user = 'admin';
const password = 'alstjq12345';
const host = 'natreeumrdsdb.cji70q1ht1ko.ap-northeast-2.rds.amazonaws.com';
const port = '3306';
const database = 'natreeumDB';
const connection = mysql_1.default.createConnection(`mysql://${user}:${password}@${host}:${port}/${database}`);
// const connection = mysql.createConnection({
//   user: 'admin',
//   password: 'alstjq12345',
//   host: 'natreeumrdsdb.cji70q1ht1ko.ap-northeast-2.rds.amazonaws.com',
//   port: 3306,
//   database: 'natreeumDB',
// });
// connection.connect();
// connection.query('SELECT * from Store', (err, rows, fields) => {
//   if (err) throw err;
//   console.log('Info : ', rows);
// });
// connection.end();
function mysqlQuery(query) {
    connection.connect();
    let data;
    function setData(pdata) {
        data = pdata;
    }
    connection.query(query, (err, rows, fields) => {
        if (err)
            throw err;
        setData(rows);
        console.log(rows);
    });
    connection.end();
    return data;
}
console.log(mysqlQuery('SELECT * from Store'));
