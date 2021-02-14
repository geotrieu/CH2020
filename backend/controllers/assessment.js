const { Assessment } = require("../models/assessment");

exports.getAllAssessments = function (req, res) {
    Assessment.find({}, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
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
