const expenseDate = document.querySelector("#dateExpense");
const expenseDescription = document.querySelector("#descriptionExpense");
const expenseCategory = document.querySelector("#categoryExpense");
const expensePrice = document.querySelector("#priceExpense");
const expenseForm = document.querySelector("#expense-form");
const expenseTypeList = document.getElementById("type");
let typeList;
function typeSelection() {
  typeList = expenseTypeList.value;
  console.log(typeList);
}

const incomeDate = document.querySelector("#dateIncome");
const incomeDescription = document.querySelector("#descriptionIncome");
const incomeCategory = document.querySelector("#categoryIncome");
const incomePrice = document.querySelector("#priceIncome");
const incomeForm = document.querySelector("#income-form");

const table = document.querySelector("#table-body");

const errorMessageBox = document.querySelector(".error-message");
const modalContainer = document.querySelector(".modal-container");
const confirmation = document.querySelector(".confirm");
const cancelation = document.querySelector(".cancel");

const incomeTotal = document.querySelector(".income p");
const mandatoryTotal = document.querySelector(".outcome-mandatory p");
const voluntaryTotal = document.querySelector(".outcome-voluntary p");
const balanceTotal = document.querySelector(".balance p");
const savingTotal = document.querySelector(".outcome-saving p");

const monthList = document.getElementById("months");
const yearList = document.getElementById("years");

const searchBar = document.querySelector('.search__input');

const priceColumnButton = document.querySelector("#sort-price .fas");
const categoryColumnButton = document.querySelector("#sort-category .fas");
const dateColumnButton = document.querySelector("#sort-date .fas");
const descriptionColumnButton = document.querySelector(
  "#sort-description .fas"
);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");

let allBudgetStorage;
let balance,
  expense,
  income, saving, voluntary, mandatory = [0, 0, 0, 0, 0, 0];
let filterMonth = [];
let filterYear = []
let monthsName = [];
let filterDate = [];
let uniqueMonthFilter = [];
let uniqueYearFilter = [];


const numberMonths = {
  01: "Enero",
  02: "Febrero",
  03: "Marzo",
  04: "Abril",
  05: "Mayo",
  06: "Junio",
  07: "Julio",
  08: "Agosto",
  09: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const monthIndex = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// const yearIndex = [
//   "",
//   "2021",
//   "2022",
//   "2023",
//   "2024",
//   "2025",
//   "2026",
//   "2027",
//   "2028",
//   "2029",
//   "2030",
// ];

