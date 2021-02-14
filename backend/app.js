
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");

app = express();
port = process.env.PORT || 3000;

require("./routes/routes")(app);

mongoose.connect(
    config.get("database.connection") + config.get("database.database"),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(port);

console.log("DoDates RESTful API server started on: " + port);
