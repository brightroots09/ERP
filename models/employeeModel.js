const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//The Employee Model
var employeeModel = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    profile: {
       first_name: {
            type: String,
            default: ""
        },
        last_name: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        }
    },
    designation: {
        type: String,
        default: ""
    },
    is_active: {
        type: Boolean,
        default: true
    },
    salary: {
        type: Number,
        default: 0
    },
    date_created: {
        type: Date
    }
});

//Hash the password before even saving to database
employeeModel.pre("save", function(next){
  var user = this;
  if(!user.isModified){
    return next()
  }
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, null, function(error, hash){
      if(error) return next(error)
      user.password = hash;
      next()
    });
  });
});

//compare password in the database and the one that the use type in
employeeModel.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("employeeModel", employeeModel, "employeeModel");
