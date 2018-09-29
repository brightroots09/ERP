module.exports = {
  sql_admin : async ()=>{
     try {
         await con.query(`
         CREATE TABLE if not exists admin (
          id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          password text,
          is_active varchar(10) NOT NULL DEFAULT 'true',
          profile_pic text
        );
         `);
     } catch (error) {
         console.log(error);
     }
   
 } 
  
}



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt-nodejs");

// //The Admin Model
// var adminModel = new Schema({
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true
//     },
//     password: String,
//     profile: {
//         name: {
//             type: String,
//             default: ""
//         },
//         image: {
//             type: String,
//             default: ""
//         }
//     },
//     is_active: {
//       type: Boolean,
//       default: true
//   },
// });

// //Hash the password before even saving to database
// adminModel.pre("save", function(next){
//   var user = this;
//   if(!user.isModified){
//     return next()
//   }
//   bcrypt.genSalt(10, function(err, salt){
//     if(err) return next(err);
//     bcrypt.hash(user.password, salt, null, function(error, hash){
//       if(error) return next(error)
//       user.password = hash;
//       next()
//     });
//   });
// });

// //compare password in the database and the one that the use type in
// adminModel.methods.comparePassword = function(password){
//   return bcrypt.compareSync(password, this.password)
// }

// module.exports = mongoose.model("adminModel", adminModel, "adminModel");
