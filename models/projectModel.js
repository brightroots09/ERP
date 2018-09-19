const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Project Model
var projectModel = new Schema({
  employee_id: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: "employeeModel"
    }
  }],
  responsible_person: {
    type: Schema.Types.ObjectId,
    ref: "employeeModel"
  },
  project_manager: {
    type: Schema.Types.ObjectId,
    ref: "employeeModel"
  },
  project_details: {
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
    default: "In Progress"
  },
  date_created: {
    type: Date
  }
});


module.exports = mongoose.model("projectModel", projectModel, "projectModel");
