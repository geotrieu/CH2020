const apiEndpoint = "http://localhost:5000";

window.onload = function () {
    document.getElementById("addNew").onclick = function () {
        addNewRow();
    };

    document.getElementById("deleteAll").onclick = function () {
        document.getElementById("tableBody").innerHTML = "";
    };

    document.getElementById("fileInputButton").onchange = function () {
        console.log("file!");
        document
            .getElementsByClassName("autofillButton")[0]
            .setAttribute("class", "button autofillButton active");
    };

    document.getElementsByClassName(
        "autofillButton"
    )[0].onclick = async function () {
        const file = document.getElementById("fileInputButton").files[0];
        if (file != null) {
            const assessments = await postPDF(file);
            assessments.forEach((a) => {
                addNewRow(a.item, formatDate(a.date), a.weight);
            });
        }
    };
};

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

async function postPDF(file) {
    // Default options are marked with *
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${apiEndpoint}/uploadSyllabus`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: formData,
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function addNewRow(name, deadline, weight = 1) {
    let newEl = document.createElement("TR");
    newEl.classList.add("tableRow");
    newEl.innerHTML = `
    <td class="tableCell name">
      <input class="tableInput" type="text" value="${name}" />
    </td>
    <td class="tableCell deadline">
      <input class="tableInput" type="date" value="${deadline}" />
    </td>
    <td class="tableCell weight">
      <input class="tableInput percent" type="number" min="1" max="100" value="${weight}" />
    </td>
    <td><img src="../assets/trash.svg" class="delete" /></td>
  `;

    document.getElementById("tableBody").appendChild(newEl);

    let deletebtns = document.getElementsByClassName("delete");
    for (const i in deletebtns) {
        deletebtns[i].onclick = function () {
            deleteRow(i);
        };
    }
}

function deleteRow(i) {
    console.log(i);
    let el = document.getElementById("tableBody");
    el.removeChild(el.childNodes[i]);

    let deletebtns = document.getElementsByClassName("delete");
    for (const i in deletebtns) {
        deletebtns[i].onclick = function () {
            deleteRow(i);
        };
    }
}
