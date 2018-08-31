const jwt = require("jsonwebtoken")


exports.getProfile    = getProfile;
exports.loginUser     = loginUser;


function getProfile(db, condition, cb){
  db
    .findById({_id: condition.id})
    .exec(function(error, result){
      if(error) return cb(error)
      else{
        return cb(null, result)
      }
    })
}


function loginUser(db, condition, cb){
  console.log(condition)
  db.findOne({email: condition.email}, function(error, user) {
    if(error) cb(error)
    if(!user){
      return cb(null, "No User")
    }

    if(!user.comparePassword(condition.password)){
      return cb(null, "Wrong Password")
    }

    if(!user.is_active){
      return cb(null, "Your account is not active")
    }

    else{
      let payload = { subject: user._id }
      let token = jwt.sign(payload, "secretKey")
      console.log(token)
      return cb(null, {
        user: user,
        token: token
      })
    }

  })
}
