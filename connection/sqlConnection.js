const mysql = require('mysql'); 
global.con =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:''
});
let connection= async function(){ 
 try {
   await con.connect(); 
   await con.query(`create database if not exists erp`);
   await con.query(`use erp`);
   console.log("Connected to SQL");
   
 } catch (error) {
    console.log("Error in connecting to database");
    return error;
 }
    
}
module.exports = connection;