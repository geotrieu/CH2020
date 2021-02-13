const calendarService = require("./services/calendarService");

var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;

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