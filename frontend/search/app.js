
window.onload = function() {
  const API_ENDPOINT = "http://localhost:3000";
  const COURSES_PATH = "courses";
  let data = [];

  function setData(_data) {
    data = _data;
    display(data);
  }

  fetch(`${API_ENDPOINT}/${COURSES_PATH}`).then(res => {
    return res.json();
  }).then(data => {
    setData(data);
  }).catch(e => {
    console.error(e);
  });

  document.getElementById("searchButton").onclick = function() {
    let courseCode = document.getElementById("courseCode").value;
    let university = document.getElementById("uni").value;
    let term = document.getElementById("term").value;

    search(courseCode, university, term);
  }
}

function search(code, uni, term) {
  console.log(`search for: ${code} ${uni} ${term}`);

  // fetch(`${API_ENDPOINT}
  //   courseName=${encodeURIComponent(name)}&
  //   courseCode=${encodeURIComponent(code)}&
  //   university=${encodeURIComponent(uni)}&
  //   uploader=${encodeURIComponent(uploader)}`
  // ).then(res => {
  //   return res.json();
  // }).then(data => {
  //   updateTable(data);
  // }).catch(e => {
  //   console.error(e.message);
  // });

  let data = [{
    id: 0,
    courseName: 'math',
    courseCode: '137',
    university: 'Queens',
    author: 'user#1234',
    subscriptions: 100
  }];
  updateTable(data);
}

function updateTable(data) {  
  if (!data || data.length == 0) {
    noDataReturned();
  } else {
    display(data);
  }
}

function noDataReturned() {
  let el = document.getElementById("resultsTableWrapper");
  document.getElementById("resultCount").innerHTML = "(0 results)";

  el.innerHTML = `
    <div id="noResultsWrapper">
      <p style="margin-bottom: 15px;">No entries found</p>
      <a href="../upload/index.html">
        <button class="button">Create your own entry</button>
      </a>
    </div>
  `;
}

function display(data) {
  let el = document.getElementById("resultsTableWrapper");
  let rows = '';

  for (const entry of data) {
    rows += `
      <tr class="row" id="${entry._id}">
        <td>${entry.course_code}</td>
        <td>${entry.course_name}</td>
        <td>${entry.university_name}</td>
        <td>${entry.term}</td>
        <td>0</td>
      </tr>
    `;
  }

  document.getElementById("resultCount").innerHTML = `(${data.length} result${data.length == 1 ? '' : 's'})`;

  el.innerHTML = `
    <table id="resultsTable" cellspacing=0>
      <tr>
        <th>Course Code</th>
        <th>Course Name</th>
        <th>University</th>
        <th>Term</th>
        <th>Subscriptions</th>
      </tr>
      ${rows}
    </table>
  `;

  let els = document.getElementsByClassName("row");
  for (const el of els) {
    el.onclick = function() {
      window.location = `../upload/index.html?id=${el.id}&name=${el.course_name}&code=${el.course_code}&uni=${el.uni}&term=${el.term}`;
    }
  }
}