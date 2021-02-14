"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    Course_name: {
        type: String,
        required: "Course nane is required",
    },
    University_name: {
        type: String,
        required: "University name is required",
    },
    Course_code: {
        type: String,
        required: "Course code is required",
    },
    Assignments: {
        type: Array,
        required: "List of assignments is required",
    },
});

module.exports = mongoose.model("Courses", CourseSchema);
