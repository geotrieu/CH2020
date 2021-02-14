const { Assessment } = require("../models/assessmentModel");
const Course = require('../models/courseModel');

exports.getICS = async function(req, res) {
    if(req.params.course != undefined){
        let body = await getCalendar(req.params.course);
        if(body != null){
            res.set("Content-Type", "text/calendar");
            res.send(body);
        } else {
            res.set("Content-Type", "text/html");
            res.send(`Course ID "${req.params.course}" could not be found`)
        }
    } else {
        res.set("Content-Type", "text/html");
        res.send("Course ID not specified");
    }
}

/***
 * Generate an ICS-compatible timestamp from a unix timestamp
 * @param {number} unix The unix timestamp in milliseconds
 * @returns {string} The ICS-compatible timestamp
 */
function getTimestamp(unix) {
    let date = new Date(unix);
    // Appending 0 then slicing by -2 will ensure leading zero is present when needed
    return `${date.getUTCFullYear()}${("0"+(date.getUTCMonth()+1)).slice(-2)}${("0"+date.getUTCDate()).slice(-2)}`;//T${("0"+date.getUTCHours()).slice(-2)}${("0"+date.getUTCMinutes()).slice(-2)}${("0"+date.getUTCSeconds()).slice(-2)}Z`
}


/**
 * Generate the ICS string from a specified course
 * @param {Course} course The course to use
 * @param {Assignment[]} assesments The assesments for the course
 * @returns {string} String representation of calendar in ICS format
 */
function generateCalendarString(course, assesments) {
    let out = `BEGIN:VCALENDAR\nVERSION:2.0\n`;
    out += `PRODID:~//CH2020-50//NONSGML ${course.course_code}-${course.id}//EN\n`;
    out += `X-WR-CALNAME:${course.course_code} Calendar\n`
    for (let assessment of assesments) {
        let timestamp = getTimestamp(assessment.date);
        out += `BEGIN:VEVENT\n`;
        out += `UID:${assessment._id}\n`;
        out += `DTSTAMP:${timestamp}\n`;
        out += `DTSTART:${timestamp}\n`;
        out += `DTEND:${timestamp}\n`;
        out += `SUMMARY:${course.course_code} ${assessment.item}\n`;
        out += `END:VEVENT\n`;
    }
    out += 'END:VCALENDAR';
    return out;
}

/**
 * Get the course calendar in ICS format
 * @param {string} id The id of the course
 * @returns {string} The ICS data as a string
 */
async function getCalendar(id){
    console.log(id);
    let course = await Course.findById(id).exec();
    let assesments = await Assessment.find({course:id}).exec();
    console.log(course);
    console.log(assesments);
    return generateCalendarString(course, assesments);
}