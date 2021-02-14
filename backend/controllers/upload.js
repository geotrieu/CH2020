const fs = require("fs");
const getAssesments = require("../services/syllabusService");

exports.handleSyllabus = function(req, res) {
    let file = req.files[0];
    if(file.mimetype === "application/pdf"){
        console.log(file);
        fs.rename(file.destination +"/" + file.filename, file.destination + "/" + file.filename+".pdf", ()=>{
            parsePDF(file.destination + "/" + file.filename+".pdf", req.query.code);
        });
        res.send("Complete");
    } else {
        res.send("Invalid file type");
    }
}

async function parsePDF(path, courseCode){
    let assesments = await getAssesments(path, courseCode);
    console.log(assesments);
}