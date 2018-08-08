const passport = require("passport");
const localStratergy = require("passport-local").Strategy;
const userModel = require("../models/user")

//serialize and deserialize
passport.serializeUser(function(user, callback){
    callback(null, user._id)
})

passport.deserializeUser(function(id, cb){
    userModel.findById(id, function(err, user){
        cb(null, user)
    })
})


//middleware
passport.use("local-login", new localStratergy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, callback){
    userModel.findOne({email: email}, function(error, user){
        if(error) return callback(error)
        
        if(!user){
            return callback(null, false, "No User")
        }

        if(!user.comparePassword(password)){
            return callback(null, false, "Wrong Password")
        }

        return callback(null, user)

    })
}))