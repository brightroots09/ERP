const mysql = require('mysql');

global.con = mysql.createConnection({
    "host": "127.0.0.1",
    "port": 3306,
    "database": "erp",
    "password": "root",
    "user": "root",
    "connector": "mysql",
    "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock"
    //  host : 'localhost',
    //  user : 'brightde_erp',
    //  password : 'cb5A?NERYalc',
    //  database : 'brightde_erp'
});

let connection = async function () {
    try {
        await con.connect();
        await con.query(`create database if not exists erp`);
        await con.query(`use erp`);
        // await con.query(`create database if not exists brightde_erp`);
        // await con.query(`use brightde_erp`);

        console.log("Database created");
        console.log("Connected to SQL");

    } catch (error) {
        console.log("Error in connecting to database");
        return error;
    }

}
module.exports = connection;