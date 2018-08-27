const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Query Model
var queryModel = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel"
    },
    to_id: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel"
    },
    message: {
        type: String,
        default: ""
    },
    date_created: {
        type: Date
    }
});


module.exports = mongoose.model("queryModel", queryModel, "queryModel");
