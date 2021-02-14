"use strict";
const multer = require("multer")({dest: "./pdfs"});

module.exports = function (app) {
    var courseController = require("../controllers/courseController");
    var assessmentController = require("../controllers/assessmentController");
    var calendarController = require("../controllers/calendarController");
    var uploadController = require("../controllers/uploadController")

    // doDates Routes
    app.route("/api/courses")
        .get(courseController.list_all_courses)
        .post(courseController.add_course);
    
    app.route("/api/courses/:courseCode")
        .get(courseController.list_all_course_entries)

    app.route("/api/assessments")
        .get(assessmentController.getAllAssessments)
        .post(assessmentController.addAssessment);

    app.route("/api/assessments/:courseId")
        .get(assessmentController.getCourseAssessments)

    app.route("/api/assessments/pdf/:fileName")
        .get(assessmentController.getPDFAssessment);

    app.route("/api/ical")
        .get(calendarController.getICS);
    
    app.route("/api/ical/:course")
        .get(calendarController.getICS);

    app.route("/api/uploadSyllabus") // query string needs code=[course code]
        .post(multer.any(), uploadController.handleSyllabus);
};
