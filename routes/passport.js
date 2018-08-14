const passport = require("passport");
const localStratergy = require("passport-local").Strategy;
const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel")

//serialize and deserialize
passport.serializeUser(function (user, callback) {
  callback(null, user._id)
});

passport.deserializeUser(function (id, cb) {
  adminModel.findById(id, function (err, user) {
    if (user) {
      cb(null, user)
    }
    else {
      employeeModel.findById(id, function (error, user) {
        cb(null, user)
      })
    }
  })


});


//middleware
passport.use("admin", new localStratergy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, callback) {
  adminModel.findOne({ email: email }, function (error, user) {
    if (error) return callback(error)

    if (!user) {
      return callback(null, false, "No User")
    }

    if (!user.comparePassword(password)) {
      return callback(null, false, "Wrong Password")
    }

    else {
      return callback(null, user)
    }
  })
}));

passport.use("employee", new localStratergy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, callback) {
  employeeModel.findOne({ email: email }, function (error, user) {
    if (error) return callback(error)

    if (!user) {
      return callback(null, false, "No User")
    }

    if (!user.comparePassword(password)) {
      return callback(null, false, "Wrong Password")
    }

    else {
      return callback(null, user)
    }
  })
}));
