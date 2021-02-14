const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const cors = require("cors");

app = express();
app.use(cors());
port = process.env.PORT || 3000;

app.use(express.json());

require("./routes/routes")(app);

mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(port);

console.log("DoDates RESTful API server started on: " + port);
