var express = require("express");
var router = express.Router();

var passport = require("passport");
var passportConfig = require("./passport");

var userModel = require("../models/user")

router.get("/", function (req, res, callback) {
    res.json("It works")
})

router.post("/register", function (req, res, callback) {
    var user = new userModel()

    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.name = req.body.name;
    user.profile.image = req.body.image || "";

    user.save(function (error, registered) {
        if (error) {
            console.error("Error in registration", error)
        }
        else {
            req.logIn(user, function (error) {
                if (error) return next(error)
                res.redirect("/profile")
            })
        }
    })


})

router.get("/login", function (req, res) {
    if(req.user){
        res.redirect("/profile")
    }
    else{
        res.json("Not LoggedIn")
    }

})

router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: false
}))

router.get("/logout", function(req, res, cb){
    req.logout();
    res.redirect("/")
})

router.get("/profile", function(req, res, callback){
    userModel
        .findById({_id: req.user._id})
        .exec(function(error, user){
            if(error) console.error("Error getting user", error)
            else{
                res.json(user)
            }
        })
})


module.exports = router