const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Update Model
var taskUpdateModel = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        ref: "projectModel"
    },
    description: {
        type: String
    },
    date_created: {
        type: Date
    }
});


module.exports = mongoose.model("taskUpdateModel", taskUpdateModel, "taskUpdateModel");
