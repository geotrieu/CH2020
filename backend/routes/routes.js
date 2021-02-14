"use strict";
const multer = require("multer")({dest: "./pdfs"});

module.exports = function (app) {
    var courseController = require("../controllers/courseController");
    var assessmentController = require("../controllers/assessmentController");
    var calendarController = require("../controllers/calendarController");
    var uploadController = require("../controllers/uploadController")

    // doDates Routes
    app.route("/courses")
        .get(courseController.list_all_courses)
        .post(courseController.add_course);
    
    app.route("/courses/:courseCode&:university")
        .get(courseController.list_all_course_entries)

    app.route("/assessments")
        .get(assessmentController.getAllAssessments)
        .post(assessmentController.addAssessment);

    app.route("/assessments/:courseId")
        .get(assessmentController.getCourseAssessments)

    app.route("/assessments/pdf/:fileName")
        .get(assessmentController.getPDFAssessment);

    app.route("/ical")
        .get(calendarController.getICS);
    
    app.route("/ical/:course")
        .get(calendarController.getICS);

    app.route("/uploadSyllabus") // query string needs code=[course code]
        .post(multer.any(), uploadController.handleSyllabus);
};
