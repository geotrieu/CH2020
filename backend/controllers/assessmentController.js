const { Assessment } = require("../models/assessmentModel");
const getSyllabus = require("../services/syllabusService");

exports.getAllAssessments = function (req, res) {
    Assessment.find({}, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.getPDFAssessment = async function (req, res) {
    const assessments = await getSyllabus(
        "../pdfs/" + req.params.fileName + ".pdf",
        req.params.fileName
    );
    res.json(assessments);
};

exports.addAssessment = function (req, res) {
    if (req.body == null) {
        return res.sendStatus(500);
    }

    if (Array.isArray(req.body)) {
        // MULTIPLE ASSESSMENTS
        const assessment = req.body.map((obj) => ({
            item: obj.item,
            date: obj.date,
            weight: obj.weight,
            course: obj.course,
        }));
        Assessment.insertMany(assessment, function (error, docs) {});
        res.json(assessment);
    } else {
        // SINGLE ASSESSMENT
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
    }
};

exports.getCourseAssessments = function (req, res) {
    Assessment.find({ course: req.params.courseId }, function (err, course) {
        if (err) res.send(err);
        else res.json(course);
    });
};
