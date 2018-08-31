const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Query Model
var queryModel = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel"
    },
    management_id: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel"
    },
    message: {
        type: String,
        default: ""
    },
    reply: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "open"
    },
    date_created: {
        type: Date
    }
});


module.exports = mongoose.model("queryModel", queryModel, "queryModel");
