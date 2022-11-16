const expenseDate = document.querySelector("#dateExpense");
const expenseDescription = document.querySelector("#descriptionExpense");
const expenseCategory = document.querySelector("#categoryExpense");
const expensePrice = document.querySelector("#priceExpense");
const expenseForm = document.querySelector("#expense-form");

const incomeDate = document.querySelector("#dateIncome");
const incomeDescription = document.querySelector("#descriptionIncome");
const incomeCategory = document.querySelector("#categoryIncome");
const incomePrice = document.querySelector("#priceIncome");
const incomeForm = document.querySelector("#income-form");

const table = document.querySelector("#table-body");

const errorMessageBox = document.querySelector(".error-message");

const incomeTotal = document.querySelector(".income p");
const expenseTotal = document.querySelector(".outcome p");
const balanceTotal = document.querySelector(".balance p");

const monthList = document.getElementById("months");
const yearList = document.getElementById("years");

let allBudgetStorage;
let balance,
  expense,
  income = [0, 0, 0];
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

