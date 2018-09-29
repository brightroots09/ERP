module.exports = {
    sql_taskUpdate : async ()=>{
       try {
           await con.query(`
           CREATE TABLE if not exists taskUpdate (
            id int(11) NOT NULL PRIMARY KEY,
            project_id varchar(255),
            description varchar(255),
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

// //The Update Model
// var taskUpdateModel = new Schema({
//     project_id: {
//         type: Schema.Types.ObjectId,
//         ref: "projectModel"
//     },
//     description: {
//         type: String
//     },
//     date_created: {
//         type: Date
//     }
// });


// module.exports = mongoose.model("taskUpdateModel", taskUpdateModel, "taskUpdateModel");
