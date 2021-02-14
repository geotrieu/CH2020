const { Assessment } = require("../models/assessment");

exports.getAllAssessments = function (req, res) {
    Assessment.find({}, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.addAssessment = function (req, res) {
    const assessment = new Assessment(req.body);
    assessment.save(function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};
