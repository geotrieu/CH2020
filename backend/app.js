const calendarService = require("./services/calendarService");

const mongoose = require("mongoose");
const config = require("config");
const express = require("express");

app = express();
port = process.env.PORT || 3000;

app.use(express.json());

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

// Show error if no course is specified
app.get("/ical", (req, res)=>{
    res.set("Content-Type", "text/html");
    res.send("Course ID not specified")
})

// Return the requested course
app.get("/ical/:course", (req, res)=>{
    let body = calendarService.getCalendar(req.params);
    if(body != null){
        res.set("Content-Type", "text/calendar");
        res.send(body);
    } else {
        res.set("Content-Type", "text/html");
        res.send(`Course ID "${req.params.course}" could not be found`)
    }
})