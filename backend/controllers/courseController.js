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

exports.add_course = async function (req, res) {
    let course_entry = {
        course_name: req.body.course_name,
        university_name: req.body.university_name,
        course_code: req.body.course_code,
        term: req.body.term
    }
    let new_course = new Course(course_entry);
    let course_id;

    try {
        let result = await new_course.save();
    } catch (ex) {
        console.error(ex);
    }
    
    assessments = req.body.assessments;
    for (let i = 0; i < assessments.length; i++) {
        assessments[i]["course"] = new_course._id;
    }
    await Assessment.insertMany(assessments);
    return res.json(assessments);
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
