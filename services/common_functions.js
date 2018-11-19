const jwt = require("jsonwebtoken")

exports.registerAdmin = registerAdmin;

exports.getProfile = getProfile;
exports.loginUser = loginUser;

exports.findAll = findAll;
exports.addEmployees = addEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteData = deleteData;


exports.addProject = addProject;
exports.findAllProjects = findAllProjects;
exports.addProjectDailyUpdates = addProjectDailyUpdates;
exports.viewDetails = viewDetails;
exports.addProjectTasks = addProjectTasks;

exports.editDetails = editDetails;

exports.findTasks = findTasks;
exports.deleteTask = deleteTask;

exports.viewQueries = viewQueries;
exports.toggleStatus = toggleStatus;

exports.veiwAttendance = veiwAttendance;
exports.dailyUpdate = dailyUpdate;

exports.findMyProjects = findMyProjects;
exports.projectDetails = projectDetails;

exports.projectTask = projectTask;

exports.askQuery = askQuery;

exports.dailyDiary = dailyDiary;
exports.addDailyUpdate = addDailyUpdate;
exports.updateDailyDiary = updateDailyDiary;


function registerAdmin(body, cb) {
  let sql = `select * from admin where email = ?`
  con.query(sql, [body.email], function (error, result) {
    if (error) cb(error)
    else {
      if (result.length > 0) {
        cb(null, true)
      }
      else {
        let sql = `insert into admin(name, email, password, profile_pic) values (?, ?, ?, ?)`;
        con.query(sql, [body.name, body.email, body.password, ""], function (error, result) {
          if (error) cb(error)
          else {
            cb(null, result)
          }
        })
      }
    }
  })
}


function getProfile(db, condition, cb) {
  let sql;

  if (db == 'admin') {
    sql = `Select * from ${db} where id=?`
  }
  else {
    sql = `select * from ${db} where employee_id=?`
  }

  con.query(sql, [condition.id], function (error, result) {
    if (error) cb(error)
    else {
      cb(null, result)
    }
  })
}


function loginUser(db, condition, cb) {
  let sql = `select * from ${db} where email=?`

  con.query(sql, [condition.email], function (error, user) {
    if (error) cb(error)
    if (user.length == 0) {
      return cb(null, "No User")
    }
    else {
      if (user[0].password !== condition.password) {

        return cb(null, "Wrong Password")
      }
      else {
        if (!user[0].is_active) {
          return cb(null, "Your account is not active")
        }
        else {
          let payload = { subject: user[0].id ? user[0].id : user[0].employee_id }
          let token = jwt.sign(payload, "secretKey")
          return cb(null, {
            user: user,
            token: token
          })
        }
      }
    }


  })


}

function findAll(db, fields, join, condition, cb) {

  if (condition || join) {
    let sql = `select ${fields} from ${db} as e LEFT JOIN projects as p ON (CONCAT(',', p.employee_id, ',') LIKE CONCAT('%,', e.employee_id, ',%')) where e.email=? OR e.employee_id=?`
    con.query(sql, [condition, condition], function (error, result) {
      if (error) cb(error)
      else {
        cb(null, result)
      }
    })
  }
  else {
    let sql = `select ${fields} from ${db}`;

    con.query(sql, function (error, result) {
      if (error) cb(error)
      else cb(null, result)
    })
  }

}

function addEmployees(db, data, cb) {
  let sql = `INSERT INTO ${db} (first_name, last_name, email, password, profile_pic, designation, salary, date_created) values (?, ?, ?, ?, "", ?, ?, ?)`;

  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else {
      cb(null, result)
    }
  })

}

function updateEmployee(db, obj, cb) {
  let sql = `update ${db} set ${obj.fields} where employee_id = ${obj.condition}`;

  let updateSql = con.query(sql, obj.data, function (error, result) {
    if (error) cb(error)
    else {
      cb(null, result)
    }
  })

}

function deleteData(db, condition, field, marks, cb) {
  let sql = `delete from ${db} where ${field} in (${marks})`

  let deleteEMP = con.query(sql, condition, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function addProject(db, data, cb) {
  let sql = `insert into ${db} (employee_id, responsible_person, project_manager, project_name, project_description, date_created) values (?, ?, ?, ?, ?, ?)`
  let addProject = con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function findAllProjects(db, fields, join, condition, cb) {
  let sql;

  if (join) {
    sql = `select ${fields} from ${db} as p LEFT JOIN employees as e ON (CONCAT(',', p.employee_id, ',') LIKE CONCAT('%,', e.employee_id, ',%')) LEFT JOIN employees as r ON p.responsible_person = r.employee_id LEFT JOIN employees as pr ON p.project_manager = pr.employee_id where ${condition}`
  }
  else {
    sql = `SELECT ${fields} FROM ${db} as p  where ${condition}`
  }

  con.query(sql, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function addProjectDailyUpdates(db, data, cb) {
  let sql = `insert into ${db} (project_id, description, date_created) values (?, ?, ?)`

  con.query(sql, [data.id, data.description, data.date], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function viewDetails(db, fields, id, cb) {
  let sql = `select ${fields} from ${db} where project_id=?`
  con.query(sql, id, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function addProjectTasks(db, data, cb) {
  let sql = `insert into ${db} (task_name, task_description, project_id, others, date_created) values (?, ?, ?, ?, ?)`

  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function findTasks(db, fields, join, condition, cb) {
  let sql;

  if (join) {
    sql = `select ${fields} from ${db} as t LEFT JOIN employees as e ON find_in_set(e.employee_id, 
      t.others) LEFT JOIN projects as p ON t.project_id = p.project_id where ${condition} ORDER BY t.date_created DESC`
  }
  else {
    sql = `SELECT ${fields}, GROUP_CONCAT(e.first_name, ' ' , e.last_name ORDER BY e.employee_id) employee_name FROM tasks as t LEFT JOIN employees as e ON find_in_set(e.employee_id, t.others) GROUP BY t.id ORDER BY t.date_created DESC`
  }


  con.query(sql, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function editDetails(db, fields, data, cb) {
  let sql = `update ${db} set ${fields}`
  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function deleteTask(db, id, cb) {
  let sql = `delete from ${db} where id=?`

  con.query(sql, [id], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function viewQueries(db, fields, condition, cb) {
  let sql

  if (condition) {
    sql = `select ${fields} from ${db} as q LEFT JOIN employees as m on q.management_id = m.employee_id where ${condition.field} order by date_created ASC`
    con.query(sql, [condition.id], function (error, result) {
      if (error) cb(error)
      else cb(null, result)
    })
  }
  else {
    sql = `select ${fields} from ${db} as q LEFT JOIN employees as e on q.employee_id = e.employee_id LEFT JOIN employees as m on q.management_id = m.employee_id order by date_created ASC`
    con.query(sql, function (error, result) {
      if (error) cb(error)
      else cb(null, result)
    })
  }
}

function toggleStatus(db, fields, data, id, cb) {
  let sql = `update ${db} set ${fields} where id=?`
  let update = con.query(sql, [data, id], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function veiwAttendance(db, fields, condition, cb) {
  let sql = `select ${fields} from ${db} as a LEFT JOIN employees as e on a.employee_id = e.employee_id where a.date_created >= ? AND a.date_created < ?`;

  let attendance = con.query(sql, [condition.prevDate, condition.nextDate], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function dailyUpdate(db, fields, data, cb) {
  let sql = `insert into ${db} (${fields}) values (?, ?, ?, ?, ?, ?, ?)`
  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function findMyProjects(db, fields, condition, cb) {
  let sql = `select ${fields} from projects p LEFT JOIN employees e on (CONCAT(',', p.employee_id, ',') LIKE CONCAT('%,', e.employee_id, ',%')) where e.employee_id=?`
  let projects = con.query(sql, [condition.id], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function projectDetails(db, fields, condition, cb) {
  let sql;

  sql = `select ${fields} from ${db} as p LEFT JOIN employees as e ON (CONCAT(',', p.employee_id, ',') LIKE CONCAT('%,', e.employee_id, ',%')) LEFT JOIN employees as r ON p.responsible_person = r.employee_id LEFT JOIN employees as pr ON p.responsible_person = pr.employee_id where project_id=?`

  con.query(sql, [condition], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function projectTask(db, fields, condition, join, cb) {

  let sql;

  if (join) {
    sql = `select ${fields} from ${db} as t LEFT JOIN employees as e ON (CONCAT(',', t.others, ',') LIKE CONCAT('%,', e.employee_id, ',%')) LEFT JOIN projects p on (CONCAT(',', t.project_id, ',') LIKE CONCAT('%,', p.project_id, ',%')) where ${condition.field}`
  }
  else {
    sql = `select ${fields} from ${db} where ${condition.field}`
  }

  con.query(sql, [condition.id], function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}

function askQuery(db, fields, data, cb) {
  let sql = `insert into ${db} (${fields}) values (?, ?, ?, ?)`
  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function dailyDiary(db, fields, condition, cb) {
  let sql = `select ${fields} from ${db} where ${condition.field} order by date_created DESC`

  con.query(sql, [condition.id], function (error, result) {
    if (error) cb(error)
    else {
      cb(null, result)
    }
  })

}

function addDailyUpdate(db, fields, data, cb) {
  let sql = `insert into ${db} (${fields}) values (?, ?, ?, ?, ?, ?)`
  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })
}

function updateDailyDiary(db, fields, data, cb) {
  let sql = `update ${db} set ${fields} where id=?`

  con.query(sql, data, function (error, result) {
    if (error) cb(error)
    else cb(null, result)
  })

}
