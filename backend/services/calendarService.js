/**
 * @type Course
 */
var testData = {
    id: 0,
    code: "TEST123",
    name: "Test course",
    author: "Greg",
    subscriptions: 5,
    assignments: [
        {
            UUID: "asdfasdfadsf",
            name: "Assignment 1",
            timestamp: 1613352509000,
            weight: 0.25
        }
    ]
}


/***
 * Generate an ICS-compatible timestamp from a unix timestamp
 * @param {number} unix The unix timestamp in milliseconds
 * @returns {string} The ICS-compatible timestamp
 */
function getTimestamp(unix) {
    let date = new Date(unix);
    // Appending 0 then slicing by -2 will ensure leading zero is present when needed
    return `${date.getUTCFullYear()}${("0"+(date.getUTCMonth()+1)).slice(-2)}${("0"+date.getUTCDate()).slice(-2)}T${("0"+date.getUTCHours()).slice(-2)}${("0"+date.getUTCMinutes()).slice(-2)}${("0"+date.getUTCSeconds()).slice(-2)}Z`
}


/**
 * Generate the ICS string from a specified course
 * @param {Course} course The course to use
 * @returns {string} String representation of calendar in ICS format
 */
function generateCalendarString(course) {
    let out = `BEGIN:VCALENDAR\nVERSION:2.0\n`;
    out += `PRODID:~//CH2020-50//NONSGML TestCalendar-${course.id}//EN\n`;
    out += `X-WR-CALNAME:${course.code} Calendar\n`
    for (let assignment of course.assignments) {
        console.log(assignment);
        let timestamp = getTimestamp(assignment.timestamp);
        out += `BEGIN:VEVENT\n`;
        out += `UID:${assignment.UUID}\n`;
        out += `DTSTAMP:${timestamp}\n`;
        out += `DTSTART:${timestamp}\n`;
        out += `DTEND:${timestamp}\n`;
        out += `SUMMARY:${assignment.name}\n`;
        out += `END:VEVENT\n`;
    }
    out += 'END:VCALENDAR';
    return out;
}


console.log(generateCalendarString(testData));