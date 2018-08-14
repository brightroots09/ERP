const express = require("express");
const router = express.Router();

const path = require("path");

const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");
const projectModel = require("../models/projectModel");
const session = require("express-session");

const commonFunction = require("../services/common_functions")

/*
* -----------
* index route
* -----------
* */
router.get("/", function(req, res, callback){
    let admin = new adminModel();

    admin.email = "admin@admin.com";
    admin.password = "admin@admin";
    admin.profile.name = "Admin";

    adminModel.findOne({email: "admin@admin.com"}, function(error, exists){
        if(error) callback(error);
        if(exists){
            res.json("Connected");
        }
        else{
            admin.save(function(error, result){
                if(error) callback(error);
                else{
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
router.post("/login", function(req, res, callback){
  let condition = {
    email: req.body.email,
    password: req.body.password
  }
  commonFunction.loginUser(adminModel, condition, function(error, result){
    if(error) callback(error)
    else{
      req.session.user = result.user
      res.send(result)
    }
  })
});

router.get("/login", function(req, res, callback){
  if(req.user){
    res.redirect("/profile")
  }
  else{
    res.json("Wrong Credentials")
  }
})

/*
* ------------
* logout route
* ------------
* */
router.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_id) {
      res.clearCookie('user_id');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});

/*
* -------------
* profile route
* -------------
* */
router.get("/profile", function(req, res, callback){
  let condition = {
    id: req.session.user._id
  };

  commonFunction.getProfile(adminModel, condition, function(error, response){
    if(error) callback(error)
    else{
      res.json(response)
    }
  })

});


/*
* -----------------------
* Get all employees route
* -----------------------
* */
router.get("/employees", function(req, res, callback) {
  if(req.user){
    employeeModel.find({}, function(error, employees) {
      if(error) callback(error);
      else{
        res.json(employees);
      }
    })
  }
});


/*
* -------------------
* Add employees route
* -------------------
* */
router.post("/add_employee", function(req, res, callback){
    let employee = new employeeModel();
    let date = new Date();
    employee.email = req.body.email;
    employee.password = req.body.password;

    employee.profile.first_name = req.body.first_name;
    employee.profile.last_name = req.body.last_name;

    employee.designation = req.body.designation;
    employee.date_created = date;

    employeeModel.findOne({email: req.body.email}, function(error, exists) {
      if(error) callback(error);
      if(exists) res.redirect("/employees");
      else{
        employee.save(function(error, result){
          if(error) callback(error);
          else{
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
router.post("/toggle_employee/:id", function(req, res, callback){
  employeeModel.findByIdAndUpdate({_id: req.params.id}, {$set: {is_active: req.body.toggle}}, function(error, result){
    if(error) callback(error);
    else{
      res.redirect("/employees");
    }
  })
});


/*
* -----------------------------
* Get particular employee route
* -----------------------------
* */
router.get("/employee/:id", function(req, res, callback){
  if(req.user){
    employeeModel.findOne({_id: req.params.id}, function(error, employee){
      if(error) callback(error);
      else{
        res.json(employee);
      }
    })
  }
});


/*
* --------------------------------
* Delete particular employee route
* --------------------------------
* */
router.post("/delete_employee/:id", function(req, res, callback){
  employeeModel.findByIdAndRemove({_id: req.params.id}, function(error, result){
    if(error) callback(error);
    else{
      res.redirect("/employees");
    }
  })
});


/*
* --------------------
* Create project route
* --------------------
* */
router.post("/create_project", function(req, res, callback){
  let project = new projectModel();
  let date = new Date();

  project.project_details.name = req.body.project_name;
  project.project_details.description = req.body.project_description;
  project.status = req.body.status;
  project.employee_id = req.body.employee_id;

  project.save(function(error, result){
    if(error) callback(error);
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
router.get("/projects", function(req, res, callback) {
  if(req.user){
    projectModel.aggregate([{ $lookup: { from: 'employeeModel', localField: 'employee_id.id', foreignField: '_id', as: 'employees' } }], function(error, result){
      if(error) callback(error);
      else{
        res.json(result);
      }
    })
  }
});


/*
* ------------------------------------
* Get particular project details route
* ------------------------------------
* */
router.get("/project/:id", function(req, res, callback) {
  if(req.user){
    projectModel.find({_id: req.params.id}, function(error, project) {
      if(error) callback(error);
      else{
        res.json(project);
      }
    })
  }
});


module.exports = router;
