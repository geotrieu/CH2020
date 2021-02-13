const pdfreader = require("pdfreader");
const moment = require("moment");

const termStart = moment("20210111", "YYYYMMDD");

var rows = {}; // indexed by y-position
var assessmentTextBlocks = [];

function extractAssessments() {
    // Look for an "Assessment" Line
    const assessmentRegex = /ASSESSMENT.*/;
    const exitAssessmentRegex = /^[A-Z ]+$/;

    let currentBlock = [];
    let inAssessment = false;

    Object.keys(rows) // => array of y-positions (type: float)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
        .forEach((y, idx, arr) => {
            line = (rows[y] || []).join("");
            //console.log(line);
            if (inAssessment) {
                if (idx == arr.length - 1) {
                    // last line before end of page
                    inAssessment = false;
                    currentBlock.push(line);
                    assessmentTextBlocks.push(currentBlock);
                    currentBlock = [];
                } else if (line.match(exitAssessmentRegex) != null) {
                    inAssessment = false;
                    assessmentTextBlocks.push(currentBlock);
                    currentBlock = [];
                } else {
                    currentBlock.push(line);
                }
            } else {
                if (line.match(assessmentRegex) != null) {
                    inAssessment = true;
                    currentBlock.push(line);
                }
            }
        });
}

let parsePDF = new Promise(function (resolve, reject) {
    new pdfreader.PdfReader().parseFileItems(
        "./pdfs/ELEC270.pdf",
        function (err, item) {
            if (!item) {
                // end of file
                resolve("parsed PDF");
            } else if (item.page) {
                extractAssessments();
                rows = {}; // clear rows for next page
            } else if (item.text) {
                // accumulate text items into rows object, per line
                (rows[item.y] = rows[item.y] || []).push(item.text);
            }
        }
    );
});

function getDateFromWeekNumber(day, week) {
    let date = moment(termStart);
    date.add(week - 1, "weeks");
    date.day(day);
    return date;
}

function parseAssessments() {
    const weekFormatRegex = /(.*) *(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday).*Week *([0-1]{0,1}[0-9]) *([0-9]{1,2})/i;

    const assessments = [];

    assessmentTextBlocks[0].forEach((item) => {
        let res = item.match(weekFormatRegex); // Format in [assessment] [day of week] of Week [week]
        if (res != null) {
            const date = getDateFromWeekNumber(res[2], res[3]);
            let assessment = {
                item: res[1].trim(),
                date: date.format(),
                weight: res[4],
            };
            assessments.push(assessment);
        }
    });

    return assessments;
}

export function getAssessments() {
    await parsePDF;
    // assumes the grading is in the first result for "ASSESSMENT..."
    //console.log(assessmentTextBlocks[0]);
    if (assessmentTextBlocks == 0) return false; // syllabus not supported
    return parseAssessments();
}