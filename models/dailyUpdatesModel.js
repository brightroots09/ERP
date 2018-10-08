module.exports = {
    sql_dailyUpdateModel : async ()=>{
       try {
           await con.query(`
           CREATE TABLE if not exists dailyUpdate (
            id int(11) NOT NULL PRIMARY KEY,
            employee_id varchar(255) NOT NULL,
            morning_session varchar(255),
            evening_session varchar(255),
            in_time varchar(20),
            out_time varchar(20),
            total_hours varchar(225),
            status varchar(20) NOT NULL DEFAULT 'Not Verified',
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

// //The Daily Update Model
// var dailyUpdateModel = new Schema({
//     employee_id: {
//         type: Schema.Types.ObjectId,
//         ref: "employeeModel"
//     },
//     morning_session: {
//         type: String,
//         default: ""
//     },
//     evening_session: {
//         type: String,
//         default: ""
//     },
//     in_time: {
//         type: String
//     },
//     out_time: {
//         type: String
//     },
//     total_hours: {
//         type: String,
//         default: ""
//     },
//     status: {
//         type: String,
//         default: "Not Verified"
//     },
//     date_created: {
//         type: Date
//     }
// });


// module.exports = mongoose.model("dailyUpdateModel", dailyUpdateModel, "dailyUpdateModel");
