"use strict";
module.exports = function (app) {
    var collection = require("../controllers/controller");
    var assessmentController = require("../controllers/assessment");
    var calendarController = require("../controllers/calendar")

    // todoList Routes
    app.route("/courses")
        .get(collection.list_all_courses)
        .post(collection.add_a_course);

    app.route("/courses/:courseId")
        .get(collection.get_course)
        
    app.route("/assessments")
        .get(assessmentController.getAllAssessments)
        .post(assessmentController.addAssessment);

    app.route("/assessments/pdf/:fileName")
        .get(assessmentController.getPDFAssessment);

    app.route("/ical")
        .get(calendarController.getICS);
    
    app.route("/ical/:course")
        .get(calendarController.getICS);
};
