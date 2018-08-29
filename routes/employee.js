const express = require("express");
const router = express.Router();

const employeeModel = require("../models/employeeModel")

const commonFunction = require("../services/common_functions")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
	commonFunction.loginUser(employeeModel, condition, function (error, result) {
		if (error) callback(error)
		else {
			req.user = result.user
			res.send(result)
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

	commonFunction.getProfile(employeeModel, condition, function (error, response) {
		if (error) callback(error)
		else {
			res.json(response)
		}
	})
});


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

	projectModel
		.find({ 'employee_id.id': condition.id })
		.exec(function (error, result) {
			if (error) callback(error)
			else {
				res.json(result)
			}
		})

});


/**
 * --------------------------------
 * PARTICULAR PROJECT DETAILS ROUTE
 * --------------------------------
 */
router.get("/project_details/:id", verifyToken, function (req, res, callback) {
	projectModel
		.find({ _id: req.params.id })
		.populate([{ path: 'employee_id.id', model: employeeModel }, { path: 'responsible_person', model: employeeModel }, { path: 'project_manager', model: employeeModel }])
		.exec(function (error, result) {
			if (error) callback(error)
			else {
				res.json(result)
			}
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
	let condition = {
		id: payload.subject
	};

	projectModel
		.aggregate([{ $match: { 'employee_id.id': mongoose.Types.ObjectId(condition.id) } }, { $lookup: { from: 'taskModel', localField: '_id', foreignField: 'project_id.id', as: 'my_tasks' } }])
		.exec(function (error, result) {
			if (error) callback(error)
			else {
				res.json(result)
			}
		})

})

router.get("/my_project_task/:id", verifyToken, function (req, res, callback) {
	taskModel
		.find({ 'project_id.id': req.params.id })
		.exec(function (error, response) {
			if (error) callback(error)
			else {
				res.json(response)
			}
		})
})

/**
 * ---------------------
 * MY TASK DETAILS ROUTE
 * ---------------------
 */
router.get("/my_task_details/:id", verifyToken, function (req, res, callback) {
	taskModel
		.find({ _id: req.params.id })
		.exec(function (error, result) {
			if (error) callback(error)
			else {
				res.json(result)
			}
		})
})


/**
 * -----------------
 * DAILY TASKS ROUTE
 * -----------------
 */
router.get("/daily_tasks/:id", verifyToken, function (req, res, callback) {
	taskUpdateModel
		.find({ project_id: req.params.id })
		.exec(function (error, result) {
			if (error) callback(error)
			else {
				res.json(result)
			}
		})
})


/**
 * ---------------------
 * ADD DAILY TASKS ROUTE
 * ---------------------
 */
router.post("/daily_tasks/:id", verifyToken, function (req, res, callback) {
	var updateTask = new taskUpdateModel()
	let date = new Date()

	updateTask.project_id = req.params.id;
	updateTask.description = req.body.description
	updateTask.date_created = date;

	updateTask.save(function (error, response) {
		if (error) callback(error)
		else {
			res.json(response)
		}
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

	var query = new queryModel()
	var date = new Date()
	query.employee_id = condition.id
	query.management_id = req.body.management_id
	query.message = req.body.message
	query.date_created = date

	query.save(function (error, response) {
		if (error) callback(error)
		else {
			res.json(response)
		}
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
	let condition = {
		id: payload.subject
	};

	queryModel
		.find({ employee_id: condition.id })
		.populate({ path: 'management_id', model: employeeModel })
		.exec(function (error, response) {
			if (error) callback(error)
			else {
				res.json(response)
			}
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
		id: payload.subject
	};

	dailyUpdatedModel
		.find({ employee_id: condition.id })
		.populate({ path: 'to_id', model: employeeModel })
		.sort({_id: -1})
		.exec(function (error, response) {
			if (error) callback(error)
			else {
				res.json(response)
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

	var dailyDiary = new dailyUpdatedModel()
	var date = new Date();

	dailyDiary.employee_id = condition.id;
	dailyDiary.message = req.body.message;
	dailyDiary.session = req.body.time;
	dailyDiary.in_time = req.body.in_time || "";
	dailyDiary.out_time = req.body.out_time || "";
	dailyDiary.date_created = date;

	dailyDiary.save(function (error, response) {
		if (error) callback(error)
		else {
			res.json(response)
		}
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
	queryModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'closed' } }, function (error, response) {
		if (error) callback(error)
		else {
			res.redirect("/employee/query")
		}
	})
})

/**
 * ------------------
 * TOGGLE TASK STATUS
 * ------------------
 */

 router.post("/toggleTaskSatus", verifyToken, function(req, res, callback){
	taskModel.findByIdAndUpdate({_id: req.body.task_id}, {$set: {status: 'completed'}}, function(error, response){
		if(error) callback(error)
		else{
			res.json(response)
		}
	})
 })

module.exports = router;
