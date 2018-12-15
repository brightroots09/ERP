const express = require("express");
const router = express.Router();

const employeeModel = require("../models/employeeModel")

const commonFunction = require("../services/common_functions")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require("moment");

const projectModel = require("../models/projectModel");
const taskModel = require("../models/taskModel");
const taskUpdateModel = require("../models/taskUpdateModel");
const queryModel = require("../models/queryModel");
const dailyUpdatedModel = require("../models/dailyUpdatesModel");


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
* Index route
* -----------
* */
router.get("/", function (req, res, callback) {
	if (req.user) {
		res.redirect("/employee/employee_profile")
	}
	else {
		res.redirect("/employee/employee_login")
	}
});

/*
* -----------
* Login route
* -----------
* */
router.post("/employee_login", function (req, res, callback) {

	let condition = {
		email: req.body.email,
		password: req.body.password
	}
	commonFunction.loginUser('employees', condition, function (error, result) {
		if (error) callback(error)
		else {
			req.user = result.user
			res.json(result)
		}
	})
});

router.get("/employee_login", function (req, res, callback) {
	if (req.user) {
		res.redirect("/employee/employee_profile")
	}
	else {
		res.json("Not Logged In")
	}
})

/*
* ----------------------
* Employee profile route
* ----------------------
* */
router.get("/employee_profile", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};
	commonFunction.getProfile('employees', condition, function (error, response) {
		if (error) callback(error)
		else {
			res.json(response)
		}
	})
});


/**
 * ---------------------
 * CHANGE PASSWORD ROUTE
 * ---------------------
 */

router.post("/change_password", verifyToken, function (req, res, callback){
	
	obj = {
		"fields": `password = ?`,
		"data": [req.body.data.confirm_password],
		"condition": req.body.id
	}

	commonFunction.updateEmployee("employees", obj, function(error, result){
		if(error) callback(error)
		else res.json("Password Changed!")
	})
})

/**
 * -----------------
 * MY PROJECTS ROUTE
 * -----------------
 */
router.get("/my_projects", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};

	let fields = `p.project_id, p.project_name, p.project_description, p.status, p.date_created`

	commonFunction.findMyProjects(null, fields, condition, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})

});


/**
 * --------------------------------
 * PARTICULAR PROJECT DETAILS ROUTE
 * --------------------------------
 */
router.get("/project_details/:id", verifyToken, function (req, res, callback) {

	let fields = `p.project_id, p.project_name, p.project_description, p.employee_id, p.status, e.first_name as employee_first_name, e.last_name as employee_last_name, e.designation as employee_designation, pr.first_name as project_manager_first_name, pr.last_name as project_manager_last_name, pr.designation as project_manager_designation, r.first_name as responsible_person_first_name, r.last_name as responsible_person_last_name, r.designation as responsible_person_designation`

	commonFunction.projectDetails('projects', fields, req.params.id, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

/**
 * --------------
 * MY TASKS ROUTE
 * --------------
 */
router.get("/my_tasks", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');

	let fields = `t.id, t.task_name, t.task_description, t.status, t.date_created, t.updated_date, p.project_name, p.project_description`

	condition = {
		field: `e.employee_id = ? AND t.project_id != ''`,
		id: payload.subject
	}

	commonFunction.projectTask('tasks', fields, condition, true, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

/**
 * ------------
 * CREATE TASKS
 * ------------
 */

router.post("/create_tasks", verifyToken, function (req, res, callback) {
	let date = new Date()

	let projectArr = []
	let projects = req.body.projects
	if (req.body.projects.length > 0) {
		for (let i in projects) {
			projectArr.push(projects[i].project_id)
		}
	}
	let tasksArr = [req.body.tasks.tasks_name, req.body.tasks.tasks_description, projectArr.join(",").toString(), req.body.employees, date]
	
	commonFunction.addProjectTasks('tasks', tasksArr, function (error, result) {
		if (error) callback(error)
		else {
			res.json(result)
		}
	})

})

/**
 * -----------------
 * OTHER TASKS ROUTE
 * -----------------
 */

router.get("/others", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');

	let fields = `t.id, t.task_name, t.task_description, t.status, t.date_created, t.total_hours, t.updated_date`

	condition = {
		field: `e.employee_id = ? AND t.project_id = ''`,
		id: payload.subject
	}

	commonFunction.projectTask('tasks', fields, condition, true, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

router.get("/my_project_task/:id", verifyToken, function (req, res, callback) {

	let fields = `id, task_name, task_description, status, date_created`

	condition = {
		field: `project_id = ?`,
		id: req.params.id
	}

	commonFunction.projectTask('tasks', fields, condition, null, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

/**
 * ---------------------
 * MY TASK DETAILS ROUTE
 * ---------------------
 */
router.get("/my_task_details/:id", verifyToken, function (req, res, callback) {

	let fields = `id, task_name, task_description, status, date_created, updated_date`

	condition = {
		field: `id = ?`,
		id: req.params.id
	}

	commonFunction.projectTask('tasks', fields, condition, null, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})


/**
 * -----------------
 * DAILY TASKS ROUTE
 * -----------------
 */
router.get("/daily_tasks/:id", verifyToken, function (req, res, callback) {

	let fields = `description, date_created`

	commonFunction.viewDetails('taskUpdate', fields, req.params.id, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})


/**
 * ---------------------
 * ADD DAILY TASKS ROUTE
 * ---------------------
 */
router.post("/daily_tasks/:id", verifyToken, function (req, res, callback) {
	let date = new Date()
	let data = {
		id: req.params.id,
		description: req.body.description,
		date: date
	}

	commonFunction.addProjectDailyUpdates('taskUpdate', data, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})

})


/**
 * ---------------
 * ADD QUERY ROUTE
 * ---------------
 */
router.post("/query", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};

	var date = new Date()

	fields = `employee_id, management_id, message, date_created`
	data = [condition.id, req.body.management_id, req.body.message, date]

	commonFunction.askQuery('queries', fields, data, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})

})


/**
 * -----------------
 * GET QUERIES ROUTE
 * -----------------
 */
router.get("/query", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	// let condition = {
	// 	id: payload.subject
	// };

	let fields = `q.id, q.employee_id, q.management_id, q.message, q.reply, q.status, q.date_created, m.first_name as management_first_name, m.last_name as management_last_name, m.designation as management_designation`

	let condition = {
		field: 'q.employee_id= ?',
		id: payload.subject
	}

	commonFunction.viewQueries('queries', fields, condition, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})


/**
 * ------------------------------
 * PARTICULAR QUERY DETAILS ROUTE
 * ------------------------------
 */
router.get("/query_details/:id", verifyToken, function (req, res, callback) {
	queryModel
		.find({ _id: req.params.id })
		.exec(function (error, response) {
			if (error) callback(error)
			else {
				res.json(response)
			}
		})
})


/**
 * -----------------
 * DAILY DIARY ROUTE
 * -----------------
 */
router.get("/daily_diary", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		field: 'employee_id = ?',
		id: payload.subject
	};

	let date = new Date()

	let fields = `id, morning_session, evening_session, in_time, out_time, total_hours, status, date_created`
	commonFunction.dailyDiary('dailyUpdate', fields, condition, function (error, result) {
		if (error) callback(error)
		else {
			if (result.length > 0) {
				if (result[0].out_time || result[0].out_time == "") {
					let in_time = moment(result[0].date_created, 'YYYY-MM-DD HH:mm:ss')
					let new_date = moment(date, 'YYYY-MM-DD HH:mm:ss')
					let diff = moment.duration(new_date.diff(in_time))
					let format_date = diff.asHours();

					res.json({ result, format_date })
				}
			}
			else {
				res.json({ result })
			}
		}
	})

})


/**
 * ---------------------
 * ADD DAILY DIARY ROUTE
 * ---------------------
 */
router.post("/daily_diary", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};

	let date = new Date();
	let fields = `employee_id, morning_session, evening_session, in_time, out_time, date_created`
	let data = [condition.id, req.body.message, "", req.body.in_time, "", date]

	commonFunction.addDailyUpdate('dailyUpdate', fields, data, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})

})

/**
 * ------------------------
 * ADD EVENING UPDATE ROUTE
 * ------------------------
 */

router.post("/addEveningUpdate/:id", function (req, res, callback) {
	let fields = `evening_session = ?, out_time = ?, total_hours = ?`

	let data = [req.body.data.message, req.body.data.out_time, req.body.in_time, req.params.id]
	console.log(req.body, data)

	commonFunction.updateDailyDiary('dailyUpdate', fields, data, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

router.get("/daily_diary_details/:id", function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		id: payload.subject
	};

	dailyUpdatedModel
		.find({ employee_id: condition.id })
		.exec(function (error, response) {
			if (error) callback(error)
			else {
				res.json(response)
			}
		})

})

/**
 * ------------------------
 * TOGGLE QUERY SATUS ROUTE
 * ------------------------
 */

router.post("/toggleQueryStatus/:id", verifyToken, function (req, res, callback) {

	let fields = `status=?`
	commonFunction.toggleStatus('queries', fields, 'closed', req.params.id, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
})

/**
 * ------------------
 * TOGGLE TASK STATUS
 * ------------------
 */

router.post("/toggleTaskSatus", verifyToken, function (req, res, callback) {

	let fields = `status=?`
	commonFunction.toggleStatus('tasks', fields, 'completed', req.body.task_id, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})

});


/**
 * ---------------------
 * VIEW ATTENDANCE ROUTE
 * ---------------------
 */

router.get("/my_attendance", verifyToken, function (req, res, callback) {
	let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
	let payload = jwt.verify(token, 'secretKey');
	let condition = {
		field: `employee_id = ?`,
		id: payload.subject
	};

	let fields = `morning_session, evening_session, total_hours, status, date_created`

	commonFunction.dailyDiary('dailyUpdate', fields, condition, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})

})


/**
 * ------------------
 * ATTENDANCE DETAILS
 * ------------------
 */
router.get("/attendance_details/:id", verifyToken, function(req, res, token){
	let condition = {
		field: `id = ?`,
		id: req.params.id
	};

	let fields = `id, morning_session, evening_session, in_time, out_time, total_hours, status, date_created`

	commonFunction.dailyDiary('dailyUpdate', fields, condition, function(error, result){
		if(error) callback(error)
		else res.json(result)
	})
})


/**
 * ------------------
 * UPDATE DAILY DAIRY
 * ------------------
 */

 router.post("/update_daily_dairy", verifyToken, function(req, res, callback){
	let fields = `in_time = ?, out_time = ?, total_hours = ?`

	let in_time = moment(req.body.in_time, 'YYYY-MM-DD HH:mm:ss')
	let new_date = moment(req.body.out_time, 'YYYY-MM-DD HH:mm:ss')
	let diff = moment.duration(new_date.diff(in_time))
	let format_date = diff.asHours();

	let data = [in_time.format('LTS'), new_date.format('LTS'), format_date, req.body.id]

	commonFunction.updateDailyDiary('dailyUpdate', fields, data, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
 })
 
/**
 * -------------
 * UPDATE TICKET
 * -------------
 */
 router.post("/update_ticket", verifyToken, function(req, res, callback) {
	let fields = `updated_date=?`
	let date = new Date()
	commonFunction.toggleStatus('tasks', fields, date, req.body.task_id, function (error, result) {
		if (error) callback(error)
		else res.json(result)
	})
 })

module.exports = router;
