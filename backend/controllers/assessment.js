const { Assessment } = require("../models/assessment");
const getSyllabus = require("../services/syllabusService");

exports.getAllAssessments = function (req, res) {
    Assessment.find({}, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.getPDFAssessment = function (req, res) {
    const assessments = getSyllabus("../pdfs/" + req.params.fileName + ".pdf");
    res.json(assessments);
};

exports.addAssessment = function (req, res) {
    const assessment = new Assessment({
        item: req.body.item,
        date: req.body.date,
        weight: req.body.weight,
        course: req.body.course,
    });
    assessment.save(function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.getCourseAssessments = function (req, res) {
    Assessment.find({ course: req.params.courseId }, function (err, course) {
        if (err) res.send(err);
        res.json(course);
    });
};

