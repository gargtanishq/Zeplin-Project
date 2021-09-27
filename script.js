// js file

// select groups move left and right under recommendation div

const scrollButtonRight = document.getElementById("scrollPageRight");
const scrollButtonLeft = document.getElementById("scrollPageLeft");

scrollButtonRight.onclick = function () {
  document.getElementById("selectGroupsId").scrollLeft += 100;
};
scrollButtonLeft.onclick = function () {
  document.getElementById("selectGroupsId").scrollLeft -= 100;
};

//

// sorting the table content

function sortTableByGroupName(table, column, asc = true) {
  // checking if asc or not
  const dirModifier = asc ? 1 : -1;
  // single tbody in case we have many tbody in a table
  const tBody = table.tBodies[0];
  // converts the data into arry form list
  const rows = Array.from(tBody.querySelectorAll("tr"));
  console.log(rows);
  // sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelector("td").textContent.trim();
    const bColText = b.querySelector("td").textContent.trim();
    // if td1 > td2 then multiply by 1 to dirModifier to remain as it is and if not then multiply by -1 for desending
    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  //   remove all the existing trs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //   Now adding trs back in the table after sorting
  tBody.append(...sortedRows);

  //   remember the sorting order
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  //   toggle between the sort classes
  table.querySelector("th").classList.toggle("th-sort-asc", asc);
  table.querySelector("th").classList.toggle("th-sort-desc", !asc);
}

let whichSort = document.getElementById("sorting");
// calling the function on click to trigger the sorting
whichSort.addEventListener("click", function () {
  // gets the element to check which class is implemented on it
  let checkOrder = document.getElementsByTagName("th")[0];
  let currentIsAscending = checkOrder.classList.contains("th-sort-asc");
  let tableElement = document.querySelector("table");
  sortTableByGroupName(tableElement, 1, !currentIsAscending);
});

// ------------------------------------------

// search bar

function searchGroupName() {
  let input = document.getElementById("inputGroupName").value;
  input = input.toLowerCase();

  // getting the th from tbody
  let tableElement = document.querySelector("table");
  let tableBody = tableElement.tBodies[0];
  let rows = Array.from(tableBody.querySelectorAll("tr"));

  //  looping in the rows tr data
  rows.forEach((element) => {
    // getting the text only from tr
    const extractGroupNameText = element
      .querySelector("td")
      .textContent.trim()
      .toLowerCase();
    console.log(extractGroupNameText);
    // checks the input with the table data
    if (!extractGroupNameText.includes(input)) {
      element.style.display = "none";
    } else {
      element.style.display = "";
    }
  });
}

// debounce

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const searchFunc = debounce(() => searchGroupName());

// side nav-bar hide and display burger

function toggleNavbar() {
  let checkClass = document.getElementById("side-navbar");
  console.log(checkClass);
  if (checkClass.className === "navbar") {
    checkClass.className += "close";
  } else {
    checkClass.className = "navbar";
  }
}

// pagination

let tableElement = document.querySelector("table");
let tableBody = tableElement.tBodies[0];
let tr = Array.from(tableBody.querySelectorAll("tr"));
let ul = document.querySelector("ul");
let arrayTr = [];
for (let i = 1; i < tr.length; i++) {
  arrayTr.push(tr[i]);
}

let limit = 10;

function displayTable(limit) {
  tableBody.innerHTML = "";
  for (let i = 0; i < limit; i++) {
    tableBody.appendChild(arrayTr[i]);
  }

  buttonGereration(limit);
}

function buttonGereration(limit) {
  const noftr = arrayTr.length;
  if (noftr <= limit) {
    ul.style.display = "none";
  } else {
    ul.style.display = "flex";
    var nofPage = Math.ceil(noftr / limit);
    updatepage(1);
    let updateflagpage = 0;
    for (let i = 1; i <= nofPage; i++) {
      let li = document.createElement("li");
      li.className = "list";
      let a = document.createElement("a");
      a.href = "#";
      a.setAttribute("data-page", i);
      a.setAttribute("id", i);
      a.setAttribute("class", "activeClass");
      li.appendChild(a);
      a.innerText = i;
      ul.insertBefore(li, document.getElementById("tableList").childNodes[3]);
      a.onclick = (e) => {
        let x = e.target.getAttribute("data-page");
        updatepage(x);
        tableBody.innerHTML = "";
        x--;
        let start = limit * x;
        let end = start + limit;
        let page = arrayTr.slice(start, end);

        for (let i = 0; i < page.length; i++) {
          let item = page[i];
          tableBody.appendChild(item);
        }
      };
    }
    // showing count
  }

  let z = 0;
  function nextElement() {
    if (this.id == "nextId") {
      z == arrayTr.length - limit
        ? (z = 0)
        : z / limit + 1 == nofPage
        ? z
        : (z += limit);
    }
    if (this.id == "prevId") {
      z == 0 ? arrayTr.length - limit : (z -= limit);
    }
    updatepage(z / limit + 1);
    tableBody.innerHTML = "";
    for (let i = z; i < z + limit; i++) {
      if (arrayTr[i] != null) {
        tableBody.appendChild(arrayTr[i]);
      } else {
        break;
      }
    }
  }

  document.getElementById("prevId").onclick = nextElement;
  document.getElementById("nextId").onclick = nextElement;
}

displayTable(10);

// select all

function selectall(source) {
  checkboxes = document.getElementsByClassName("subC");
  for (var t = 0, n = checkboxes.length; t < n; t++) {
    checkboxes[t].checked = source.checked;
  }
}

// goto

function onChangeGoToPage(go) {
  var noftr = arrayTr.length;
  var nofPage = Math.ceil(noftr / limit);
  console.log(go, nofPage);
  if (go <= nofPage && go > 0) {
    var goto = go - 1;
    updatepage(go);

    if (nofPage < goto) {
      return;
    }
    let offset = goto * limit;
    tableBody.innerHTML = "";
    for (let i = offset; i < offset + limit; i++) {
      if (arrayTr[i] != null) {
        tableBody.appendChild(arrayTr[i]);
      } else {
        break;
      }
    }
  }
}

const GoToPage = debounce((go) => onChangeGoToPage(go));

function updatepage(go) {
  var spanvalue1 = document.getElementById("goto_lower");
  spanvalue1.textContent = go * limit + 1 - limit;

  var spanvalue2 = document.getElementById("goto_upper");
  spanvalue2.textContent = go * limit;
}

let element = document.getElementsByClassName("activeClass");
for (let i = 0; i < element.length; i++) {
  element[i].addEventListener("click", function () {
    let activeOne = document.querySelector(".active");

    if (activeOne) {
      activeOne.classList.remove("active");
    }

    element[i].classList.add("active");
  });
}
