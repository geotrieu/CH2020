"use strict";
module.exports = function (app) {
    var courseController = require("../controllers/course");
    var assessmentController = require("../controllers/assessment");
    var calendarController = require("../controllers/calendar")

    // doDates Routes
    app.route("/courses")
        .get(courseController.list_all_courses)
        .post(courseController.add_a_course);
    
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
};
