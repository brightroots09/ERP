const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Daily Update Model
var dailyUpdateModel = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: "employeeModel"
    },
    morning_session: {
        type: String,
        default: ""
    },
    evening_session: {
        type: String,
        default: ""
    },
    in_time: {
        type: String
    },
    out_time: {
        type: String
    },
    date_created: {
        type: Date
    }
});


module.exports = mongoose.model("dailyUpdateModel", dailyUpdateModel, "dailyUpdateModel");
