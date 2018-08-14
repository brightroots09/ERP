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
  db.findOne({email: condition.email}, function(error, user) {
    if(error) cb(error)
    if(!user){
      return cb(null, false, "No User")
    }

    if(!user.comparePassword(condition.password)){
      return cb(null, false, "Wrong Password")
    }

    else{
      return cb(null, user)
    }

  })
}
