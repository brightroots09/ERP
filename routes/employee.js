const express = require("express");
const router = express.Router();

const passport = require("passport");
const passportConfig = require("./passport");

const employeeModel = require("../models/employeeModel")

const commonFunction = require("../services/common_functions")

/*
* -----------
* Index route
* -----------
* */
router.get("/", function(req, res, callback) {
  if(req.user){
    res.redirect("/employee_profile")
  }
  else{
    res.redirect("/employee_login")
  }
});

/*
* -----------
* Login route
* -----------
* */
router.post("/employee_login", passport.authenticate("employee", {
  successRedirect: "/employee_profile",
  failureRedirect: "/employee_login",
  failureFlash: false
}));

router.get("/employee_login", function(req, res, callback){
  if(req.user){
    res.redirect("/employee_profile")
  }
  else{
    res.json("Not Logged In")
  }
})

/*
* ----------------------
* Employee profile route
* ----------------------
* */
router.get("/employee_profile", function(req, res, callback){
  let condition = {
    id: req.user._id
  }
  commonFunction.getProfile(employeeModel, condition, function(error, response){
    if(error) callback(error);
    else{
      res.json(response);
    }
  })
});



module.exports = router;
