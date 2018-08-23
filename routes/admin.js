const express = require("express");
const router = express.Router();

const path = require("path");

const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");
const projectModel = require("../models/projectModel");
const session = require("express-session");

const commonFunction = require("../services/common_functions");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/**
 * --------------------------
 * MIDDLEWARE TO VERIFY TOKEN
 * --------------------------
 */
function verifyToken(req, res, callback){
  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized Request")
  }
  let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
  if(token === 'null'){
    return res.status(401).send('Unauthorized Request')
  }
  let payload = jwt.verify(token, 'secretKey');
  if(!payload){
    return res.status(401).send('Unauthorized Request')
  }
  req.userId = payload.subject;
  callback()
}

/*
* -----------
* index route
* -----------
* */
router.get("/", function (req, res, callback) {
  let admin = new adminModel();

  admin.email = "admin@admin.com";
  admin.password = "admin@admin";
  admin.profile.name = "Admin";

  adminModel.findOne({ email: "admin@admin.com" }, function (error, exists) {
    if (error) callback(error);
    if (exists) {
      res.json("Connected");
    }
    else {
      admin.save(function (error, result) {
        if (error) callback(error);
        else {
          // res.sendFile(path.join(__dirname, "dist/ERP/index.html"))
          res.json("Connected")
        }
      })
    }
  })

});


/*
* -----------
* login route
* -----------
* */
router.post("/login", function (req, res, callback) {
  let condition = {
    email: req.body.email,
    password: req.body.password
  }
  commonFunction.loginUser(adminModel, condition, function (error, result) {
    if (error) callback(error)
    else {
      res.send(result)
    }
  })
});

router.get("/login", function (req, res, callback) {
  if (req.user) {
    res.redirect("/profile")
  }
  else {
    res.json("Wrong Credentials")
  }
})

/*
* ------------
* logout route
* ------------
* */
// router.get('/logout', (req, res) => {
//   if (req.session.user && req.cookies.user_id) {
//     res.clearCookie('user_id');
//     res.redirect('/');
//   } else {
//     res.redirect('/login');
//   }
// });

/*
* -------------
* profile route
* -------------
* */
router.get("/profile", verifyToken,function (req, res, callback) {
  let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
  let payload = jwt.verify(token, 'secretKey');
  let condition = {
    id: payload.subject
  };

  commonFunction.getProfile(adminModel, condition, function (error, response) {
    if (error) callback(error)
    else {
      res.json(response)
    }
  })

});


/*
* -----------------------
* Get all employees route
* -----------------------
* */
router.get("/employees", verifyToken, function (req, res, callback) {
  employeeModel.find({}, function (error, employees) {
    if (error) callback(error);
    else {
      res.json(employees);
    }
  })
});


/*
* -------------------
* Add employees route
* -------------------
* */
router.post("/add_employee", verifyToken, function (req, res, callback) {
  let employee = new employeeModel();
  let date = new Date();
  employee.email = req.body.email;
  employee.password = req.body.password;

  employee.profile.first_name = req.body.first_name;
  employee.profile.last_name = req.body.last_name;

  employee.designation = req.body.designation;
  employee.date_created = date;

  employeeModel.findOne({ email: req.body.email }, function (error, exists) {
    if (error) callback(error);
    if (exists) res.redirect("/employees");
    else {
      employee.save(function (error, result) {
        if (error) callback(error);
        else {
          console.log(result);
          res.redirect("/employees");
        }
      })
    }
  })
});


/*
* -------------------------------
* Change status of employee route
* -------------------------------
* */
router.post("/toggle_employee/:id", verifyToken, function (req, res, callback) {
  employeeModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { is_active: req.body.toggle } }, function (error, result) {
    if (error) callback(error);
    else {
      res.redirect("/employees");
    }
  })
});

/**
 * -------------------
 * EDIT EMPLOYEE ROUTE
 * -------------------
 */
router.post("/edit_employee/:id", function(req, res, callback){
  var obj = {
    "profile.first_name": req.body.profile.first_name,
    "profile.last_name": req.body.profile.last_name,
    "email": req.body.email,
    "designation": req.body.designation
  }

  employeeModel.findByIdAndUpdate({_id: req.params.id}, {$set: obj}, function(error, result){
    if(error) callback(error)
    else{
      res.redirect(`/employee/${req.params.id}`)
    }
  })
  
})


/*
* -----------------------------
* Get particular employee route
* -----------------------------
* */
router.get("/employee/:id", verifyToken, function (req, res, callback) {
  employeeModel
    .aggregate([{$match: {_id: mongoose.Types.ObjectId(req.params.id)}},{ $lookup: { from: 'projectModel', localField: '_id', foreignField: 'employee_id.id', as: 'projects' } }], function (error, result) {
      if (error) callback(error);
      else {
        res.json(result);
      }
    })

});


/*
* --------------------------------
* Delete particular employee route
* --------------------------------
* */
router.post("/delete_employee/:id", verifyToken, function (req, res, callback) {
  employeeModel.findByIdAndRemove({ _id: req.params.id }, function (error, result) {
    if (error) callback(error);
    else {
      res.redirect("/employees");
    }
  })
});


/*
* --------------------
* Create project route
* --------------------
* */
router.post("/create_project", verifyToken, function (req, res, callback) {
  let project = new projectModel();
  let date = new Date();

  let arr = []
  let employee = req.body.employee

  for(let i in employee){
    arr.push({
      id: mongoose.Types.ObjectId(employee[i]._id)
    })
  }

  project.project_details.name = req.body.project.project_name;
  project.project_details.description = req.body.project.project_description;
  project.status = req.body.project.status;
  project.employee_id = arr;
  project.date_created = date;

  project.save(function (error, result) {
    if (error) callback(error);
    else {
      res.redirect("/projects");
    }
  })
});


/*
* --------------------------
* Get all the projects route
* --------------------------
* */
router.get("/projects", verifyToken, function (req, res, callback) {
  projectModel.aggregate([{ $lookup: { from: 'employeeModel', localField: 'employee_id.id', foreignField: '_id', as: 'employees' } }], function (error, result) {
    if (error) callback(error);
    else {
      res.json(result);
    }
  })
});


/*
* ------------------------------------
* Get particular project details route
* ------------------------------------
* */
router.get("/project_details/:id", verifyToken, function (req, res, callback) {
  projectModel.aggregate([{$match: {_id: mongoose.Types.ObjectId(req.params.id)}}, { $lookup: { from: 'employeeModel', localField: 'employee_id.id', foreignField: '_id', as: 'employees' } }], function (error, project) {
    if (error) callback(error);
    else {
      res.json(project);
    }
  })
});

/**
 * ------------------
 * EDIT PROJECT ROUTE
 * ------------------
 */

router.post("/edit_project/:id", function(req, res, callback){
  let obj
  if(req.body.status){
    obj = {
      "project_details.name": req.body.project_details.name,
      "project_details.description": req.body.project_details.description,
      "status": req.body.status
    }
  }
  else{
    obj = {
      "project_details.name": req.body.project_details.name,
      "project_details.description": req.body.project_details.description
    }
  }
  projectModel.findByIdAndUpdate({_id: req.params.id}, {$set: obj}, function(error, response){
    if(error) callback(error)
    else{
      res.redirect(`/project_details/${req.params.id}`)
    }
  })
})

module.exports = router;
