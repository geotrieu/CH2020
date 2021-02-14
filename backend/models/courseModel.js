"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    course_name: {
        type: String,
        required: "Course name is required",
    },
    university_name: {
        type: String,
        required: "University name is required",
    },
    course_code: {
        type: String,
        required: "Course code is required",
    },
    term: {
        type: String,
        required: "Term of course is required",
    },
});

module.exports = mongoose.model("Courses", CourseSchema);
