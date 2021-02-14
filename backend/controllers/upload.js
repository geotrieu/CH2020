const fs = require("fs");

exports.handleSyllabus = function(req, res) {
    let file = req.files[0];
    if(file.mimetype === "application/pdf"){
        console.log(file);
        fs.rename(file.destination +"/" + file.filename, file.destination + "/" + file.filename+".pdf", ()=>{
            // TODO: Call parser from here
        });
        res.send("Complete");
    } else {
        res.send("Invalid file type");
    }
}