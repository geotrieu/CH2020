window.onload = function() {
  const API_ENDPOINT = "http://localhost:3000/api";
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
    let term = document.getElementById("selectTerm").value;

    search(courseCode, university, term);
  }

  setTermDropdown();

  function search(code, uni, term) {
    if (!code && !uni && term === 'Term') return;
    
    let vals = [encodeURIComponent(code).toLowerCase(), encodeURIComponent(uni).toLowerCase(), term];
    vals = vals.filter(x => x).join('&');
    fetch(`${API_ENDPOINT}/courses/${vals}`
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

  function setTermDropdown() {
    let e = document.getElementById("selectTerm");
    e.innerHTML = '';

    let empty = document.createElement('OPTION');
    empty.innerText = 'Term';
    empty.selected = true;
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

    e.appendChild(curOption);
    e.appendChild(nextOption);

    e.onchange = function() {
      if (e.value === 'Term') {
        e.classList.add('default');
      } else {
        e.classList.remove('default');
      }
    }
  }
}
