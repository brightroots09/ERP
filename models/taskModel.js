module.exports = {
    sql_tasks : async ()=>{
       try {
           await con.query(`
           CREATE TABLE if not exists tasks (
            id int(11) NOT NULL PRIMARY KEY,
            task_name varchar(255),
            task_description varchar(255),
            status varchar(255) NOT NULL DEFAULT 'in-progress',
            project_id varchar(255),
            others varchar(255),
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

// //The Tasks Model
// var taskModel = new Schema({
//     tasks_details: {
//         name: {
//             type: String,
//             default: ""
//         },
//         description: {
//             type: String,
//             default: ""
//         }
//     },
//     status: {
//         type: String,
//         default: "in-progress"
//     },
//     project_id: [{
//         id: {
//             type: Schema.Types.ObjectId,
//             ref: "projectModel"
//         }
//     }],
//     others: [{
//         id: {
//             type: Schema.Types.ObjectId,
//             ref: "employeeModel"
//         }
//     }],
//     date_created: {
//         type: Date
//     }
// });


// module.exports = mongoose.model("taskModel", taskModel, "taskModel");
