//! Project KPI
//! started CRUD
let API = "http://localhost:8000/kpi";

let inputName = $(".inp-name");
let inputPhone = $(".inp-phone");
let inputWeek = $(".inp-week-kpi");
let inputMonth = $(".inp-month-kpi");
let addForm = $(".add-form");

async function addStudent(event) {
  event.preventDefault();
  let nameVal = inputName.val().trim();
  let phoneVal = inputPhone.val().trim();
  let weekVal = inputWeek.val().trim();
  let monthVal = inputMonth.val().trim();
  let newStudent = {
    name: nameVal,
    phone: phoneVal,
    weekKpi: weekVal,
    monthKpi: monthVal,
  };
  console.log(newStudent);
  for (let key in newStudent) {
    if (!newStudent[key]) {
      alert("Заполните поля!");
      return;
    }
  }
  try {
    const response = await axios.post(API, newStudent);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  inputName.val("");
  inputPhone.val("");
  inputWeek.val("");
  inputMonth.val("");
}

addForm.on("submit", addStudent);

let studentsList = $(".tbody");
let students = [];

async function getStudents(URL) {
  try {
    const response = await axios(URL);
    // console.log(response);
    students = response.data;
    handlPagination();
  } catch (error) {
    console.log(error);
  }
}







// ! Pagination
let pagination = $(".pagination");
const studentsPerPage = 7;
let currentPage = 1;
let pagesCount = 1;
function handlPagination() {
  let indexOfLastStudent = currentPage * studentsPerPage;
  let indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  let currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  kpi(currentStudents);
  pagesCount = Math.ceil(students.length / studentsPerPage);
  // console.log(pagesCount);
  addPagination(pagesCount);
}

function addPagination(pagesCount) {
  pagination.html("");
  for (let i = 1; i <= pagesCount; i++) {
    pagination.append(`
     <li class="page-item ${
       currentPage === i ? "active" : ""
     }"><a class="page-link pagination-item" href="#">${i}</a></li>
    `);
  }
}

$(document).on("click", ".pagination-item", (event) => {
  let newPage = event.target.innerText;
  currentPage = +newPage;
  handlPagination();
});

// ! Search

let searchInp = $(".search-inp");
async function search(event) {
  let value = event.target.value;
  try {
    const response = await axios(`${API}?q=${value}`);
    students = response.data;
    currentPage = 1;
    handlPagination();
  } catch (error) {
    console.log(error);
  }
}
searchInp.on("input", search);