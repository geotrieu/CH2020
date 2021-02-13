const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(
    config.get("database.connection") + config.get("database.database"),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const Assessment = mongoose.model("Assessment", {
    item: String,
    date: Date,
    weight: Number,
    course: mongoose.Schema.ObjectId,
});

exports.Assessment = Assessment;
