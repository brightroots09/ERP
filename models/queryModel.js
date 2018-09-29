module.exports = {
    sql_queries : async ()=>{
       try {
           await con.query(`
           CREATE TABLE if not exists queries (
            id int(11) NOT NULL PRIMARY KEY,
            employee_id varchar(255),
            management_id varchar(255),
            message varchar(255),
            reply varchar(255),
            status varchar(255) NOT NULL DEFAULT 'open',
            date_created datetime
          );
           `);
       } catch (error) {
           console.log(error);
       }
     
   } 
    
  }


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //The Query Model
// var queryModel = new Schema({
//     employee_id: {
//         type: Schema.Types.ObjectId,
//         ref: "employeeModel"
//     },
//     management_id: {
//         type: Schema.Types.ObjectId,
//         ref: "employeeModel"
//     },
//     message: {
//         type: String,
//         default: ""
//     },
//     reply: {
//         type: String,
//         default: ""
//     },
//     status: {
//         type: String,
//         default: "open"
//     },
//     date_created: {
//         type: Date
//     }
// });


// module.exports = mongoose.model("queryModel", queryModel, "queryModel");
