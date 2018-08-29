const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Tasks Model
var taskModel = new Schema({
    tasks_details: {
        name: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    },
    status: {
        type: String,
        default: "in-progress"
    },
    project_id: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: "projectModel"
        }
    }],
    date_created: {
        type: Date
    }
});


module.exports = mongoose.model("taskModel", taskModel, "taskModel");
