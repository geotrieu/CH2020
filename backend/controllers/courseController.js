const mongoose = require("mongoose");
const { Assessment } = require("../models/assessmentModel");
const Course = require("../models/courseModel");

exports.list_all_course_entries = function (req, res) {
    Course.find(
        {
            Course_code: req.params.courseCode,
            University_name: req.params.university,
        },
        function (err, course) {
            if (err) res.send(err);
            res.json(course);
        }
    );
};

exports.add_course = function (req, res) {
    var course_entry = {
        course_name: req.body.course_name,
        university_name: req.body.university_name,
        course_code: req.body.course_code,
        term: req.body.term
    }
    var new_course = new Course(course_entry);
    var course_id;
    new_course.save(function (err, course) {
        if (err) res.send(err);
        res.json(course);
    });

    Assessment.insertMany(req.body.assessments);    
};


exports.list_all_courses = function (req, res) {
    Course.find({}, function (err, course) {
        if (err) res.send(err);
        res.json(course);
    });
};

exports.add_a_course = function (req, res) {
    var new_course = new Course(req.body);
    new_course.save(function (err, course) {
        if (err) res.send(err);
        res.json(course);
    });
};

exports.delete_course = function (req, res) {
    Course.remove(
        {
            _id: req.params.courseId,
        },
        function (err, course) {
            if (err) res.send(err);
            res.json({ message: "Course successfully deleted" });
        }
    );
};
