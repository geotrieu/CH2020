const apiEndpoint = "http://localhost:3000/api";

window.onload = function () {
    const params = new URLSearchParams(window.location.search);

    load();

    let headerFields = document.getElementsByClassName("headerTextField");
    for (const el of headerFields) {
        el.onchange = function () {
            if (this.value != '') {
                this.classList.remove('required');
            }
        }
    }

    document.getElementById("addNew").onclick = function () {
        addNewRow();
    };

    document.getElementById("deleteAll").onclick = function () {
        document.getElementById("tableBody").innerHTML = "";
    };

    document.getElementById("submitButton").onclick = async function (e) {
        e.preventDefault();

        //Validation
        let nameRequired = document.getElementById("courseName").value != "";
        let codeRequired = document.getElementById("courseCode").value != "";
        let universityRequired =
            document.getElementById("university").value != "";
        // let termRequired = document.getElementById("term").value != "";
        let termRequired = document.getElementById("selectTerm").value != "Term";

        if (!nameRequired) {
            document.getElementById("courseName").classList.add("required");
        } else {
            document.getElementById("courseName").classList.remove("required");
        }
        if (!codeRequired) {
            document.getElementById("courseCode").classList.add("required");
        } else {
            document.getElementById("courseCode").classList.remove("required");
        }
        if (!universityRequired) {
            document.getElementById("university").classList.add("required");
        } else {
            document.getElementById("university").classList.remove("required");
        }
        if (!termRequired) {
            document.getElementById("selectTerm").classList.add("required");
        } else {
            document.getElementById("selectTerm").classList.remove("required");
        }

        if (
            !(
                nameRequired &&
                codeRequired &&
                universityRequired &&
                termRequired
            )
        )
            return;

        let res = await submitCourse();
        console.log(res);
        let link = `${apiEndpoint}/ical/${res.course_id}`;
        showModal(link);

        document.getElementById("copyLink").onclick = function () {
            let link = document.getElementById("link").innerText;
            let dummy = document.createElement("INPUT");
            document.body.appendChild(dummy);
            dummy.setAttribute("id", "dummy_id");
            document.getElementById("dummy_id").value = link;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        };
    };

    let fileInput = document.getElementById("fileInputButton");
    fileInput.onchange = function () {
        console.log(fileInput.files.length);

        if (fileInput.files.length == 0) {
            document.getElementById("autofillButton").disabled = true;
        } else {
            document.getElementById("autofillButton").disabled = false;
        }
    };

    document.getElementById("autofillButton").onclick = async function () {
        document.getElementById("tableBody").innerHTML = "";
        document.getElementById("courseName").value = "";
        document.getElementById("courseCode").value = "";

        const file = document.getElementById("fileInputButton").files[0];
        if (file != null) {
            const data = await postPDF(file);
            if (data.course != null) {
                document.getElementById("courseName").value =
                    data.course.courseTextBlock;
                document.getElementById("courseCode").value =
                    data.course.courseID;
            }
            data.assessments.forEach((a) => {
                addNewRow(a.item, formatDate(a.date), a.weight);
            });
        }
    };

    function load() {
        document.getElementById("courseName").value =
            params.get("courseName") || "";
        document.getElementById("courseCode").value =
            params.get("courseCode") || "";
        document.getElementById("university").value =
            params.get("university") || "";

        setTermDropdown(params.get("term") || null);
        
        let id = params.get("id");
        if (id) {
            fetch(`${apiEndpoint}/assessments/${id}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    for (const a of data) {
                        addNewRow(a.item, formatDate(a.date), a.weight);
                    }
                })
                .catch((e) => console.error(e));
        }
    }

    function showModal(link) {
        let modal = document.getElementById("modal");
        modal.classList.add("showModal");

        document.getElementById("link").innerText = link;
    }

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

    async function submitCourse() {
        let numEntries = document.getElementsByClassName("tableRow").length;
        if (numEntries == 0) return false;

        let inputs = document.getElementsByClassName("name");
        let deadlines = document.getElementsByClassName("deadline");
        let weights = document.getElementsByClassName("weight");

        const data = {
            course_name: document.getElementById("courseName").value,
            course_code: document.getElementById("courseCode").value,
            university_name: document.getElementById("university").value,
            term: document.getElementById("term").value,
            assessments: [],
        };

        for (let i = 0; i < numEntries; i++) {
            data.assessments.push({
                item: inputs[i].children[0].value,
                date: deadlines[i].children[0].value,
                weight: weights[i].children[0].value,
            });
        }

        // Default options are marked with *
        const response = await fetch(`${apiEndpoint}/courses`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    function addNewRow(name = "", deadline, weight = 1) {
        let newEl = document.createElement("TR");
        newEl.classList.add("tableRow");
        newEl.innerHTML = `
      <td class="tableCell name">
        <input class="tableInput" type="text" value="${name || ''}" />
      </td>
      <td class="tableCell deadline">
        <input class="tableInput" type="date" value="${deadline || ''}" />
      </td>
      <td class="tableCell weight">
        <input class="tableInput percent" type="number" min="1" max="100" value="${weight || ''}" />
      </td>
      <td class="deleteCol"><img src="../assets/trash.svg" class="delete" /></td>
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

    function setTermDropdown(cur) {
        let e = document.getElementById("selectTerm");
        e.innerHTML = '';
    
        let empty = document.createElement('OPTION');
        empty.innerText = 'Term';
        e.appendChild(empty);
    
        let seasons = ["Winter", "Spring", "Summer", "Fall"];
    
        let seasonId = Math.floor(((new Date()).getMonth() + 1) / 4);
        let curSeason = seasons[seasonId];
        let year = (new Date()).getFullYear();
        let nextSeason = (seasonId < 3) ? seasons[seasonId + 1] : seasons[0];
        let nextYear = year + (seasonId == 3 ? 1 : 0);
    
        let curOption = document.createElement('OPTION');
        curOption.innerText = `${curSeason} ${year}`;
        let nextOption = document.createElement('OPTION');
        nextOption.innerText = `${nextSeason} ${nextYear}`;

        if (cur) {
            let fromParam = document.createElement('OPTION');
            fromParam.innerText = cur;
            fromParam.selected = true;
            e.appendChild(fromParam);
            e.classList.remove('default');
        } else {
            empty.selected = true;
        }

        if (`${curSeason} ${year}` != cur) e.appendChild(curOption);
        if (`${nextSeason} ${nextYear}` != cur) e.appendChild(nextOption);
    
        e.onchange = function() {
          if (e.value === 'Term') {
            e.classList.add('default');
          } else {
            e.classList.remove('default');
          }
          this.classList.remove('required');
        }
      }
};
