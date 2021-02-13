"use strict";
module.exports = function (app) {
    var collection = require("../controllers/controller");
    var assessmentController = require("../controllers/assessment");

    // todoList Routes
    app.route("/courses")
        .get(collection.list_all_courses)
        .post(collection.add_a_course);

    app.route("/courses/:courseId")
        .get(collection.get_course)
        .post(collection.delete_course);

    app.route("/assessments")
        .get(assessmentController.getAllAssessments)
        .post(assessmentController.addAssessment);
};
