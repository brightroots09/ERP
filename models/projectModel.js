module.exports = {
  sql_projects : async ()=>{
     try {
         await con.query(`
         CREATE TABLE if not exists projects (
          project_id int(11) NOT NULL PRIMARY KEY,
          employee_id varchar(255),
          responsible_person varchar(255),
          project_manager varchar(255),
          project_name varchar(255),
          project_description varchar(255),
          status varchar(255) NOT NULL DEFAULT 'In Progress',
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

// //The Project Model
// var projectModel = new Schema({
//   employee_id: [{
//     id: {
//       type: Schema.Types.ObjectId,
//       ref: "employeeModel"
//     }
//   }],
//   responsible_person: {
//     type: Schema.Types.ObjectId,
//     ref: "employeeModel"
//   },
//   project_manager: {
//     type: Schema.Types.ObjectId,
//     ref: "employeeModel"
//   },
//   project_details: {
//     name: {
//       type: String,
//       default: ""
//     },
//     description: {
//       type: String,
//       default: ""
//     }
//   },
//   status: {
//     type: String,
//     default: "In Progress"
//   },
//   date_created: {
//     type: Date
//   }
// });


// module.exports = mongoose.model("projectModel", projectModel, "projectModel");
