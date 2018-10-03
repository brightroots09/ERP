const express = require("express");
const router = express.Router();

const path = require("path");

const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");
const projectModel = require("../models/projectModel");
const tasksModel = require("../models/taskModel");
const taskUpdateModel = require("../models/taskUpdateModel");
const queryModel = require("../models/queryModel");
const dailyUpdatesModel = require("../models/dailyUpdatesModel");

const session = require("express-session");
const moment = require("moment");
const async = require("async");
const _ = require("underscore");

const commonFunction = require("../services/common_functions");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/**
 * --------------------------
 * MIDDLEWARE TO VERIFY TOKEN
 * --------------------------
 */
function verifyToken(req, res, callback) {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized Request")
	}
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	if (token === 'null') {
		return res.status(401).send('Unauthorized Request')
	}
	let payload = jwt.verify(token, 'secretKey');
	if (!payload) {
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
	// let admin = new adminModel();
	let adminObj = {
		email: "admin@admin.com",
		password: "admin@admin",
		name: "Admin"
	}

	commonFunction.registerAdmin(adminObj, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})

	// adminModel.findOne({ email: "admin@admin.com" }, function (error, exists) {
	// 	if (error) callback(error);
	// 	if (exists) {
	// 		res.json("Connected");
	// 	}
	// 	else {
	// 		admin.save(function (error, result) {
	// 			if (error) callback(error);
	// 			else {
	// 				// res.sendFile(path.join(__dirname, "dist/ERP/index.html"))
	// 				res.json("Connected")
	// 			}
	// 		})
	// 	}
	// })

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
	
	let asyncTasks = []

	asyncTasks.push(registerAdmin.bind(null))
	asyncTasks.push(loginAdmin.bind(null))

	async.waterfall(asyncTasks, function(error, result){
		if(error) console.log("======>", error)
		else {
			res.json(result)
		}
	})

	function registerAdmin(cb){
		let adminObj = {
			email: "admin@admin.com",
			password: "admin@admin",
			name: "Admin"
		}
	
		commonFunction.registerAdmin(adminObj, function(error, response){
			if(error) callback(error)
			else{
				cb(null, response)
			}
		})
	}

	function loginAdmin(response, cb){
		if(response){
			commonFunction.loginUser("admin", condition, function (error, result) {
				if (error) callback(error)
				else {
					cb(null, result)
				}
			})
		}
		else {
			console.log(error)
		}
	}
});

router.get("/login", function (req, res, callback) {
	if (req.user) {
		res.redirect("/admin/profile")
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
router.get("/profile", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};
	commonFunction.getProfile("admin", condition, function (error, response) {
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

	let fields = "employee_id, first_name as employee_first_name, last_name as employee_last_name, email as employee_email, profile_pic as employee_profile_pic, designation as employee_designation, is_active as employee_is_active, salary as employee_salary, date_created as employee_date_created"
	commonFunction.findAll("employees", fields, null, null, function(error, employees){
		if(error) callback(error)
		else{
			res.json(employees)
		}
	})
});


/*
* -------------------
* Add employees route
* -------------------
* */
router.post("/add_employee", verifyToken, function (req, res, callback) {
	var date = new Date();

	var obj = [
		req.body.first_name,
		req.body.last_name,
		req.body.email,
		req.body.password,
		req.body.designation,
		req.body.salary,
		date
	]

	var asyncTasks = [];

	asyncTasks.push(findByEmail.bind(null, req.body.email));
	asyncTasks.push(addEmployee.bind(null, obj));

	async.waterfall(asyncTasks, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})

	function findByEmail(email, cb){
		let fields = "e.employee_id, e.first_name, e.last_name, e.email, e.profile_pic, e.designation, e.is_active, e.salary, e.date_created"
		commonFunction.findAll("employees", fields, null, email, function(error, result){
			if(error) cb(error)
			else{
				cb(null, result)
			}
		})
	}

	function addEmployee(obj, result, cb){
		if(result.length > 0){
			cb(null, 'Email Already Exists')
		}
		else{
			commonFunction.addEmployees("employees", obj, function(error, result){
				if(error) callback(error)
				else{
					cb(null, result)
				}
			})
		}
	}

});

/**
 * -------------------
 * EDIT EMPLOYEE ROUTE
 * -------------------
 */
router.post("/edit_employee/:id", verifyToken, function (req, res, callback) {
	let obj;

	if (req.body.is_active) {
		obj = {
			"fields": `first_name = ?, last_name = ?, email = ?, designation = ?, salary = ?, is_active = ?`,
			"data": [req.body.first_name, req.body.last_name, req.body.email, req.body.designation, req.body.salary, req.body.is_active],
			"condition": req.params.id
		}
	}
	else {
		obj = {
			"fields": `first_name = ?, last_name = ?, email = ?, designation = ?, salary = ?`,
			"data": [req.body.first_name, req.body.last_name, req.body.email, req.body.designation, req.body.salary],
			"condition": req.params.id
		}
	}

	let asyncTasks = [];

	asyncTasks.push(findByEmail.bind(null, req.params.id))
	asyncTasks.push(updateEmployee.bind(null, obj))

	async.waterfall(asyncTasks, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})

	function findByEmail(email, cb){
		let fields = "COUNT(*) as employee"
		commonFunction.findAll("employees", fields,  null, email, function(error, result){
			if(error) cb(error)
			else{
				cb(null, result)
			}
		})
	}

	function updateEmployee(data, result, cb){
		if(result[0].employee > 0){
			commonFunction.updateEmployee("employees", data, function(error, result){
				if(error) cb(error)
				else cb(null, result)
			})
		}
		else{
			cb(null, "Employee not Found!")
		}
	}
})


/*
* -----------------------------
* Get particular employee route
* -----------------------------
* */
router.get("/employee/:id", verifyToken, function (req, res, callback) {

	let fields = `e.employee_id, e.first_name, e.last_name, e.email, e.designation, e.salary, e.is_active, e.profile_pic, e.date_created, p.project_id, p.project_name, p.project_description, p.status, p.employee_id as assigned_employess, p.responsible_person, p.project_manager, p.date_created`

	commonFunction.findAll("employees", fields, true, req.params.id, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})
});


/*
* --------------------------------
* Delete particular employee route
* --------------------------------
* */
router.post("/delete_employee/:id", verifyToken, function (req, res, callback) {
	let asyncTasks = []

	asyncTasks.push(findById.bind(null, req.params.id))
	asyncTasks.push(deleteById.bind(null, req.params.id))

	async.waterfall(asyncTasks, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})

	function findById(id, cb){
		let fields = `COUNT(*) as employee`
		commonFunction.findAll("employees", fields, null, id, function(error, result){
			if(error) cb(error)
			else cb(null, result)
		})
	}

	function deleteById(id, result, cb){
		if(result[0].employee > 0){
			commonFunction.deleteData("employees", id, 'employee_id', '?', function(error, result){
				if(error) cb(error)
				else cb(null, result)
			})
		}
		else cb(null, 'Employee not found.')
	}

});

/**
 * -----------------------------
 * DELETE MULTIPLE EMPLOYEE ROUTE
 * -----------------------------
 */

router.post("/delete_employees", verifyToken, function (req, res, callback) {
	let arr = [];
	let marks = []
	for (let i = 0; i < req.body.length; i++) {
		arr.push(req.body[i].employee_id)
		marks.push('?')
	}
	if (arr.length > 0) {
		commonFunction.deleteData("employees", arr, 'employee_id', marks, function(error, result){
			if(error) callback(error)
			else {
				res.json(result)
			}
		})
	}
})

/*
* --------------------
* Create project route
* --------------------
* */
router.post("/create_project", verifyToken, function (req, res, callback) {
	let date = new Date();

	console.log(req.body)

	let employeeArr = []

	let employee = req.body.employee

	for (let i in employee) {
		employeeArr.push(employee[i].employee_id)
	}

	let projectArr = [employeeArr.join(",").toString(), req.body.project.responsible_person, req.body.project.project_manager, req.body.project.project_name, req.body.project.project_description, date]

	commonFunction.addProject("projects", projectArr, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
});


/*
* --------------------------
* Get all the projects route
* --------------------------
* */
router.get("/projects", verifyToken, function (req, res, callback) {
	let fields = `p.project_id, p.project_name, p.project_description, p.status, p.employee_id, p.responsible_person, p.project_manager, p.date_created`

	commonFunction.findAllProjects('projects', fields, null, 1, function(error, result){
		if(error) callback(error)
		else {
			res.json(result)
		}
	})
});


/*
* ------------------------------------
* Get particular project details route
* ------------------------------------
* */
router.get("/project_details/:id", verifyToken, function (req, res, callback) {
	let fields = `p.project_id, p.project_name, p.project_description, p.status, p.employee_id, p.responsible_person, p.project_manager, p.date_created, e.employee_id as employee, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation, r.employee_id as responsible_person_id, r.first_name as responsible_person_first_name, r.last_name as responsible_person_last_name, r.designation as responsible_person_designation, pr.employee_id as project_manager_id, pr.first_name as project_manager_first_name, pr.last_name as project_manager_last_name, pr.designation as project_manager_designation`
	
	let condition = `p.project_id = ${req.params.id}`

	commonFunction.findAllProjects('projects', fields, true, condition, function(error, result){
		if(error) callback(error)
		else {
			// let result12 = _.groupBy(result, 'project_id');
			res.json(result)
		}
	})
});

/**
 * ------------------
 * EDIT PROJECT ROUTE
 * ------------------
 */

router.post("/edit_project/:id", verifyToken, function (req, res, callback) {
	let fields = "project_name=?, project_description=?, status=? where project_id=?"
	let arr = [req.body.data[0].project_name, req.body.data[0].project_description, req.body.data[0].status, req.params.id]
	commonFunction.editDetails('projects', fields, arr, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})

})

router.post("/edit_project_employee/:id", verifyToken, function(req, res, callback){
	let employee_id = []
	for(let i = 0; i < req.body.length; i++){
		employee_id.push(req.body[i].employee_id)
	}
	let string = employee_id.join(",").toString()
	var uniqueList=string.split(',').filter(function(allItems,i,a){
		return i==a.indexOf(allItems);
	}).join(',');
	
	let fields = "employee_id=? where project_id = ?"
	commonFunction.editDetails('projects', fields, [uniqueList, req.params.id], function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

router.post("/edit_project_manager/:id", verifyToken, function(req, res, callback){
	let fields = `project_manager = ? where project_id = ?`
	arr = [req.body.project_manger, req.params.id]

	commonFunction.editDetails('projects', fields, arr, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

router.post("/editResponsiblePerson/:id", verifyToken, function(req, res, callback){
	let fields = `responsible_person = ? where project_id = ?`
	arr = [req.body.responsible_person, req.params.id]

	commonFunction.editDetails('projects', fields, arr, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})

})

/**
 * --------------------
 * DELETE PROJECT ROUTE
 * --------------------
 */
router.post("/project_delete/:id", verifyToken, function (req, res, callback) {
	projectModel.findByIdAndRemove({ _id: req.params.id }, function (error, response) {
		if (error) callback(error)
		else {
			res.redirect("/admin/projects")
		}
	})
})

/**
 * -----------------------------
 * DELETE MULTIPLE PROJECT ROUTE
 * -----------------------------
 */

router.post("/projects_delete", verifyToken, function (req, res, callback) {
	let arr = [];
	let marks = []
	for (let i = 0; i < req.body.length; i++) {
		arr.push(req.body[i].project_id)
		marks.push('?')
	}
	if (arr.length > 0) {
		commonFunction.deleteData("projects", arr, 'project_id', marks, function(error, result){
			if(error) callback(error)
			else {
				res.json(result)
			}
		})
	}
})

/**
 * ---------
 * GET TASKS
 * ---------
 */

router.get("/tasks", verifyToken, function (req, res, callback) {
	
	let fields = "t.id as task_id, t.task_name, t.task_description, t.date_created as task_date_create"

	commonFunction.findTasks('tasks', fields, false, 1, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

/**
 * -----------------
 * GET TASKS DETAILS
 * -----------------
 */

router.get("/tasks_details/:id", verifyToken, function (req, res, callback) {
	let fields = "t.id as task_id, t.task_name, t.task_description, t.status, t.project_id, t.others, t.date_created as task_date_created, p.project_name, p.project_description, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation"
	
	let condition = `t.id = ${req.params.id}`

	commonFunction.findTasks('tasks', fields, true, condition, function(error, result){
		if(error) callback(error)
		else {
			// let result12 = _.groupBy(result, 'project_id');
			res.json(result)
		}
	})

})

/**
 * -------------------------
 * GET PROJECT TASKS DETAILS
 * -------------------------
 */

router.get("/project_tasks_details/:id", verifyToken, function (req, res, callback) {
	let fields = `id as task_id, task_name, task_description, date_created`
	commonFunction.viewDetails('tasks', fields, req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

/**
 * ------------
 * CREATE TASKS
 * ------------
 */

router.post("/create_tasks", verifyToken, function (req, res, callback) {
	// let tasks = new tasksModel()
	let date = new Date()

	let projectArr = []
	let employeeArr = []

	let employee = req.body.employees
	let projects = req.body.projects
	
	if (req.body.projects.length > 0) {
		for (let i in projects) {
			projectArr.push(projects[i].project_id)
		}
	}
	if (req.body.employees.length > 0) {
		for (let i in employee) {
			employeeArr.push(employee[i].employee_id)
		}
	}
	
	let tasksArr = [req.body.tasks.tasks_name, req.body.tasks.tasks_description, projectArr.join(",").toString(), employeeArr.join(",").toString(), date]

	commonFunction.addProjectTasks('tasks', tasksArr, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})

	// tasks.tasks_details.name = req.body.tasks.tasks_name;
	// tasks.tasks_details.description = req.body.tasks.tasks_description;
	// tasks.project_id = arr;
	// tasks.others = arrEmployee;
	// tasks.date_created = date;

	// tasks.save(function (error, result) {
	// 	if (error) callback(error)
	// 	else {
	// 		res.redirect("/admin/tasks")
	// 	}
	// })

})


/**
 * ---------
 * EDIT TASK
 * ---------
 */

router.post("/edit_task/:id", verifyToken, function (req, res, callback) {
	let fields = "task_name=?, task_description=? where id=?"
	let arr = [req.body[0].task_name, req.body[0].task_description, req.params.id]
	commonFunction.editDetails('tasks', fields, arr, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

router.post("/edit_project_task/:id", verifyToken, function (req, res, callback) {
	let obj
	if (req.body.status) {
		obj = {
			"tasks_details.name": req.body.tasks_details.name,
			"tasks_details.description": req.body.tasks_details.description,
			"status": req.body.status
		}
	}
	else {
		obj = {
			"tasks_details.name": req.body.tasks_details.name,
			"tasks_details.description": req.body.tasks_details.description
		}
	}
	tasksModel.findByIdAndUpdate({ "_id": req.params.id }, { $set: obj }, function (error, response) {
		if (error) callback(error)
		else {
			res.redirect(`/admin/tasks_details/${req.params.id}`)
		}
	})
})



/**
 * -----------
 * DELETE TASK
 * -----------
 */
router.post("/delete_task/:id", verifyToken, function (req, res, callback) {
	commonFunction.deleteTask('tasks', req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

/**
 * ------------
 * DELETE TASKS
 * ------------
 */

router.post("/delete_tasks", verifyToken, function (req, res, callback) {
	let arr = [];
	let marks = []
	for (let i = 0; i < req.body.length; i++) {
		arr.push(req.body[i].task_id)
		marks.push('?')
	}
	if (arr.length > 0) {
		commonFunction.deleteData("tasks", arr, 'id', marks, function(error, result){
			if(error) callback(error)
			else {
				res.json(result)
			}
		})
	}
})

/**
 * ---------------------
 * UPDATE PROJECT'S TASK
 * ---------------------
 */

router.post("/update_project_task", verifyToken, function (req, res, callback) {
	let date = new Date()

	let obj = {
		id: req.body.id,
		description: req.body.data.description,
		date: date
	}

	commonFunction.addProjectDailyUpdates("taskUpdate", obj, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})

})

router.get("/view_daily_updates/:id", verifyToken, function (req, res, callback) {

	commonFunction.viewDetails('taskUpdate', 'description', req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * ---------------------
 * GET ALL QUERIES ROUTE
 * ---------------------
 */

router.get("/queries", verifyToken, function (req, res, callback) {

	let fields = `q.id, q.employee_id, q.management_id, q.message, q.reply, q.status, q.date_created, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation, m.first_name as management_first_name, m.last_name as management_last_name, m.designation as management_designation`

	commonFunction.viewQueries("queries", fields, null, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * --------------------
 * GET ATTENDANCE ROUTE
 * --------------------
 */

router.get("/attendance/:date", verifyToken, function (req, res, callback) {

	let date = new Date(`${req.params.date}`)
	let date2 = new Date(moment(date).add('24', 'hours'))

	let fields = `a.id, a.employee_id, a.morning_session, a.evening_session, a.in_time, a.out_time, a.total_hours, a.status, a.date_created, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation`

	let condition = {
		prevDate: date,
		nextDate: date2
	}

	commonFunction.veiwAttendance('dailyUpdate', fields, condition, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

router.get("/allAttendance/:date", verifyToken, function (req, res, callback) {
	let date = new Date(`${req.params.date}`)

	let month = date.getMonth()
	let year = date.getFullYear()

	let prevDate = new Date(year, month, 1)
	let nextDate = new Date(year, month + 1, 1)

	let fields = `a.id, a.employee_id, a.morning_session, a.evening_session, a.in_time, a.out_time, a.total_hours, a.status, a.date_created, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation, e.salary as employee_salary`

	let condition = {
		prevDate: prevDate,
		nextDate: nextDate
	}

	commonFunction.veiwAttendance('dailyUpdate', fields, condition, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * -----------------------
 * TOGGLE ATTENDANCE ROUTE
 * -----------------------
 */

router.post("/toggle_attendance/:id", verifyToken, function (req, res, callback) {

	let fields = `status=?`

	commonFunction.toggleStatus('dailyUpdate', fields, req.body.status, req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * ------------------------
 * TOGGLE QUERY SATUS ROUTE
 * ------------------------
 */

router.post("/toggleQueryStatus/:id", verifyToken, function (req, res, callback) {
	let fields = `status=?`
	commonFunction.toggleStatus('queries', fields, 'closed', req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})

/**
 * --------------------
 * REPLY TO QUERY ROUTE
 * --------------------
 */
router.post("/reply_to_query/:id", verifyToken, function (req, res, callback) {

	let fields = `reply=?`
	commonFunction.toggleQuery('queries', fields, req.body.reply, req.params.id, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * -------------------------
 * CREATE PROJECT TASK ROUTE
 * -------------------------
 */


router.post("/create_project_task", verifyToken, function (req, res, callback) {
	let date = new Date()

	let employeeArr = []

	let employee = req.body.employees

	for (let i in employee) {
		employeeArr.push(employee[i].employee_id)
	}

	let taskArr = [req.body.data.tasks_name, req.body.data.tasks_description, req.body.id, employeeArr.join(",").toString(), date]

	commonFunction.addProjectTasks('tasks', taskArr, function(error, result){
		if(error) callback(error)
		else{
			res.json(result)
		}
	})
})


/**
 * -------------------
 * ADD ABSENTIES ROUTE
 * -------------------
 */

router.post("/add_absenties", verifyToken, function (req, res, callback) {

	let date = new Date(req.body.date)
	// let dailyUpdate = new dailyUpdatesModel()

	let fields = `employee_id, morning_session, evening_session, in_time, out_time, total_hours, date_created`;
	let data = [req.body.id, 'Absent', 'Absent', '-', '-', '0', date]

	commonFunction.dailyUpdate('dailyUpdate', fields, data, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})

	// dailyUpdate.save(function (error, response) {
	// 	if (error) callback(error)
	// 	else {
	// 		res.json(response)
	// 	}
	// })

})


module.exports = router;
