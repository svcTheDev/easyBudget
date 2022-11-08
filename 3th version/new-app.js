/* 1 - — Gets the expenses and income entries of the user */
/* 2 - — Get the filterDate in order to print the table */
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

let allBudgetStorage = [];
let balance,
  expense,
  income = [0, 0, 0];

expenseForm.addEventListener("submit", getExpense);
incomeForm.addEventListener("submit", getIncome);

function getExpense(e) {
  e.preventDefault();
  let moneyLost = new Audio("Audios/coin-fail.mp3");
  moneyLost.play();

  if (
    !expenseDate.value ||
    !expenseDescription.value ||
    !expenseCategory.value ||
    !expensePrice.value
  ) {
    showErrorMessage([
      expenseDate,
      expenseDescription,
      expenseCategory,
      expensePrice,
    ]);

    return;
  }

  let expenseValues = {
    id: Date.now(),
    type: "expense",
    date: expenseDate.value,
    description: expenseDescription.value,
    category: expenseCategory.value,
    price: parseFloat(expensePrice.value),
  };

  allBudgetStorage.push(expenseValues);

  expenseForm.reset();
  setCurrentDates();
  generateDateList();
//   setAllCalculations();
//   showTableEntries(allBudgetStorage);
  location.reload();
}
function getIncome(e) {
  e.preventDefault();

  let moneyAdded = new Audio("Audios/Poker-Chips-short.mp3");

  moneyAdded.play();

  if (
    !incomeDate.value ||
    !incomeDescription.value ||
    !incomeCategory.value ||
    !incomePrice.value
  ) {
    showErrorMessage([
      incomeDate,
      incomeDescription,
      incomeCategory,
      incomePrice,
    ]);
    return;
  }

  let incomeValues = {
    id: Date.now(),
    type: "income",
    date: incomeDate.value,
    description: incomeDescription.value,
    category: incomeCategory.value,
    price: parseFloat(incomePrice.value),
  };

  allBudgetStorage.push(incomeValues);

  incomeForm.reset();
  setCurrentDates();
  generateDateList();
//   setAllCalculations();
//   showTableEntries(allBudgetStorage);
  location.reload();
}

function showErrorMessage(inputs) {
    const checkEmptyField = inputs.filter((input) => input.value === "");
  
    checkEmptyField.forEach((field) => {
      field.classList.add("error-field");
      setTimeout(function () {
        field.classList.remove("error-field");
      }, 3000);
  
      errorMessageBox.classList.add("show-message");
      errorMessageBox.classList.add("hide-error-message");
  
      setTimeout(function () {
        errorMessageBox.classList.remove("show-message");
        errorMessageBox.classList.remove("hide-error-message");
      }, 6000);
    });
  }

 
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
  
  const yearIndex = [
    "",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];
  
  const monthList = document.getElementById("months");
  const yearList = document.getElementById("years");
  let monthsName = [];
  
  function setCurrentDates() {
    let getMonth = [];
    let getYear = [];
    let getMonthString = "";
    for (let i = 0; i < allBudgetStorage.length; i++) {
      getMonthString = allBudgetStorage[i].date.slice(5, 7);
      getMonth.push(Math.abs(getMonthString));
      getYear.push(allBudgetStorage[i].date.slice(0, -5));
    }
    let uniqueYears = [...new Set(getYear)];
    let uniqueMonths = [...new Set(getMonth)];
    return [uniqueMonths, uniqueYears];
  }
 
  
  function generateDateList() {
    let currentMonths = setCurrentDates()[0];
    let currentYears = setCurrentDates()[1];
    /* Months */
    for (let m = 0; m < currentMonths.length; m++) {
      monthsName.push(numberMonths[currentMonths[m]]);
      const monthOption = document.createElement("option");
      monthList.appendChild(monthOption);
      monthOption.innerHTML = `${numberMonths[currentMonths[m]]}`;
    }
    /* Years */
    for (let y = 0; y < currentYears.length; y++) {
      const yearOption = document.createElement("option");
      yearList.appendChild(yearOption);
  
      yearOption.innerHTML = `${currentYears[y].slice(0, -1)}`;
    }
  }
    
  function showMonthFiltered() {
    let indexSelection = '';
    if (monthsName.includes(monthList.value)) {
      const indexMonth = monthIndex.findIndex(
        (monthIndex) => monthIndex === monthList.value
      );
         indexSelection = `-${indexMonth}-`;
      if (indexMonth < 10) {
        indexSelection = `-0${indexMonth}-`;
      }
      const filterMonth = allBudgetStorage.filter((budget) =>
      budget.date.includes(indexSelection)
      );
      console.log(filterMonth);
      showTableEntries(filterMonth);
      showFilterTotal(filterMonth);
    }
    return indexSelection;
  }
  
  function showYearFiltered() {
    if(!yearList.value) {
      return;
    }
    console.log(0);
    if (yearIndex.includes(yearList.value)) {
      const filterYear = allBudgetStorage.filter((budget) =>
      budget.date.includes(yearList.value)
    );
    showTableEntries(filterYear);
    showFilterTotal(filterYear);
      return yearList.value;
    }
  }
  
  function showDateFiltered() {
    if (showMonthFiltered() && showYearFiltered()) {
      console.log(2);
      let date = showYearFiltered() + showMonthFiltered();
      console.log(date);
      const filterDate = allBudgetStorage.filter((budget) =>
        budget.date.includes(date)
      );
      showTableEntries(filterDate);
      showFilterTotal(filterDate);
    }
    console.log(1);
    return;
  }