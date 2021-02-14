const mongoose = require("mongoose");

const Assessment = mongoose.model("Assessment", {
    item: String,
    date: Date,
    weight: Number,
    course: mongoose.Schema.ObjectId,
});

exports.Assessment = Assessment;
