const API_ENDPOINT = "";

window.onload = function() {
  noDataReturned();

  document.getElementById("searchButton").onclick = function() {
    let courseName = document.getElementById("courseName").value;
    let courseCode = document.getElementById("courseCode").value;
    let university = document.getElementById("uni").value;
    let uploader = document.getElementById("uploader").value;

    search(courseName, courseCode, university, uploader);
  }
}


function search(name, code, uni, uploader) {
  console.log(`search for: ${name} ${code} ${uni} ${uploader}`);


  // fetch(`${API_ENDPOINT}?
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
      <tr class="row">
        <td>${entry.courseName}</td>
        <td>${entry.courseCode}</td>
        <td>${entry.university}</td>
        <td>${entry.author}</td>
        <td>${entry.subscriptions}</td>
      </tr>
    `;
  }

  document.getElementById("resultCount").innerHTML = `(${data.length} result${data.length == 1 ? '' : 's'})`;

  el.innerHTML = `
    <table id="resultsTable" cellspacing=0>
      <tr>
        <th>Course name</th>
        <th>Course code</th>
        <th>University</th>
        <th>Author</th>
        <th>Subscriptions</th>
      </tr>
      ${rows}
    </table>
  `;
}