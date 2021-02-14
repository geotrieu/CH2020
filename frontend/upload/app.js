window.onload = function() {
  let parsePdf_endpoint = "/uploadSyllabus";

  document.getElementById("addNew").onclick = function() {
    addNewRow();
  }

  document.getElementById("deleteAll").onclick = function() {
    document.getElementById("tableBody").innerHTML = '';
  }

  let fileInput = document.getElementById("fileInputButton");
  fileInput.onchange = function() {
    console.log(fileInput.files.length);

    if (fileInput.files.length == 0) {
      document.getElementById("autofillButton").disabled = true;
    } else {
      document.getElementById("autofillButton").disabled = false;
    }
  }

  document.getElementById("autofillButton").onclick = function() {
    if (fileInput.files.length == 0) return;
    
    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch(parsePdf_endpoint, {
      method: 'POST',
      body: formData
    }).then(res => {
      return res.json();
    }).then(data => {
      updateTable(data);
    }).catch(e => {
      console.error(e);
    })
  }
}

function updateTable(data) {
  if (!data || data.length == 0) return;

  document.getElementById("courseName").value = data.courseName;
  document.getElementById("courseCode").value = data.courseCode;
  document.getElementById("uni").value = data.university;
  document.getElementById("tableBody").innerHTML = "";

  for (const entry of data.assignments) {
    let newEl = document.createElement('TR');
    newEl.classList.add('tableRow');
    newEl.innerHTML = `
      <td class="tableCell name">
        <input class="tableInput" type="text" value="${entry.name}"/>
      </td>
      <td class="tableCell deadline">
        <input class="tableInput" type="date" value="${entry.deadline}"/>
      </td>
      <td class="tableCell weight">
        <input class="tableInput percent" type="number" min="1" max="100" value="1" value="${entry.weight}" />
      </td>
      <td><img src="../assets/trash.svg" class="delete" /></td>
    `;

    document.getElementById("tableBody").appendChild(newEl);
  }

  let deletebtns = document.getElementsByClassName('delete');
  for (const i in deletebtns) {
    deletebtns[i].onclick = function() {
      deleteRow(i);
    }
  }
}

function addNewRow() {
  let newEl = document.createElement('TR');
  newEl.classList.add('tableRow');
  newEl.innerHTML = `
    <td class="tableCell name">
      <input class="tableInput" type="text" />
    </td>
    <td class="tableCell deadline">
      <input class="tableInput" type="date" />
    </td>
    <td class="tableCell weight">
      <input class="tableInput percent" type="number" min="1" max="100" value="1" />
    </td>
    <td><img src="../assets/trash.svg" class="delete" /></td>
  `;

  document.getElementById("tableBody").appendChild(newEl);

  let deletebtns = document.getElementsByClassName('delete');
  for (const i in deletebtns) {
    deletebtns[i].onclick = function() {
      deleteRow(i);
    }
  }
}

function deleteRow(i) {
  console.log(i);
  let el = document.getElementById('tableBody');
  el.removeChild(el.childNodes[i]);

  let deletebtns = document.getElementsByClassName('delete');
  for (const i in deletebtns) {
    deletebtns[i].onclick = function() {
      deleteRow(i);
    }
  }
}