const admin = require("./adminModel");
const dailyUpdates = require("./dailyUpdatesModel");
const employess = require("./employeeModel");
const projects = require("./projectModel");
const queries = require("./queryModel");
const tasks = require("./taskModel");
const taskUpdates = require("./taskUpdateModel");

let model_index = async () => {
    try {
        await admin.sql_admin();
        await dailyUpdates.sql_dailyUpdateModel();
        await employess.sql_employees();
        await projects.sql_projects();
        await queries.sql_queries();
        await tasks.sql_tasks();
        await taskUpdates.sql_taskUpdate();
    } catch (error) {
        console.log("Error while executing tables")
    }
}

module.exports = {
    model_index
}