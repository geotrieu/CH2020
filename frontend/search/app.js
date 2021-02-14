
window.onload = function() {
  const API_ENDPOINT = "http://localhost:3000";
  const COURSES_PATH = "courses";
  let data = [];

  function setData(_data) {
    data = _data;
    updateTable(data);
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

  function search(code, uni, term) {
    console.log(`search for: ${code} ${uni} ${term}`);
    console.log(`${API_ENDPOINT}/courses/${encodeURIComponent(code).toLowerCase()}&${encodeURIComponent(uni).toLowerCase()}`);

    fetch(`${API_ENDPOINT}/courses/${encodeURIComponent(code).toLowerCase()}&${encodeURIComponent(uni).toLowerCase()}`
    ).then(res => {
      return res.json();
    }).then(data => {
      setData(data);
    }).catch(e => {
      console.error(e.message);
    });
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
          <th class="tableHeader" id="th-course_code">Course Code</th>
          <th class="tableHeader" id="th-course_name">Course Name</th>
          <th class="tableHeader" id="th-university_name">University</th>
          <th class="tableHeader" id="th_term">Term</th>
          <th>Subscriptions</th>
        </tr>
        ${rows}
      </table>
    `;

    let els = document.getElementsByClassName("row");
    for (const i in els) {
      els[i].onclick = function() {
        let dest = `../upload/index.html?id=${data[i]._id}`;

        if (data[i].course_name) dest += `&courseName=${data[i].course_name}`;
        if (data[i].course_code) dest += `&courseCode=${data[i].course_code}`;
        if (data[i].university_name) dest += `&university=${data[i].university_name}`;
        if (data[i].term) dest += `&term=${data[i].term}`;

        window.location = dest;
      }
    }
  }
}
