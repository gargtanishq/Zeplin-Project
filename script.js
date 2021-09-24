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

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
const searchFunc = debounce(() => searchGroupName());

// side nav-bar hide and display burger

function toggleNavbar(){
  let checkClass = document.getElementById("side-navbar");
  console.log(checkClass);
  if (checkClass.className === "navbar"){
      checkClass.className += "close";
  }
  else{
      checkClass.className = "navbar"; 
  } 
}