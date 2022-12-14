

// * 1 -  — Gets the expenses and income entries of the user */ 
 
// * 2 - — Get the filterDate in order to print the table */

// * 3 - Updates the incomes, expenses, and balance automatically
// * 4 — Translates automatically the totals into words
// * 5 — Instant search tool of the entries on the table
// * 6 — Sorts function on all the 4 categories
// * 7 — Deletes dynamically the rows by clicking the delete button
// * 8 — Edit function to change entry rows manually
// * 9 — Clones rows by clicking the clone icon
//* 10 - Drag rows

// let december2022;
// let january2023;
// let febuary2023;
// let lastDate;
// let savedLastDate;

// let uniqueMonths = [];
// let uniqueYears = [];
// // let allmonths = [december2022, january2023]
// let originalPrices = []

// allBudgetStorage = JSON.parse(localStorage.getItem("globalBudgetSaved")) || [];
// december2022 = JSON.parse(localStorage.getItem("budgetDecember2022")) || [];
// january2023 = JSON.parse(localStorage.getItem("budgetJanuary2023")) || [];
// febuary2023 = JSON.parse(localStorage.getItem("budgetFebuary2023")) || [];
// lastDate = JSON.parse(localStorage.getItem("lastDate")) || '';

// console.log({december2022: december2022, january2023: january2023, febuary2023: febuary2023, all: allBudgetStorage, lastDate: lastDate});

// if (allBudgetStorage.length > 1) {
  if (lastDate.includes('2023-01')) {
    setCurrentDates(allBudgetStorage);
    generateDateList();
    setAllCalculations(january2023)
    showTableEntries(january2023)
    setSearch(january2023)
    setSortTool(january2023)
    originalPrices = [...january2023];
  }
  if (lastDate.includes('2022-12')) {
    setCurrentDates(allBudgetStorage);
    generateDateList();
    setAllCalculations(december2022)
    showTableEntries(december2022)
    setSearch(december2022)
    originalPrices = [...december2022];
    setSortTool(december2022)
  }
  if (lastDate.includes('2023-02')) {
    setCurrentDates(allBudgetStorage);
    generateDateList();
    setAllCalculations(febuary2023)
    showTableEntries(febuary2023)
    setSearch(febuary2023)
    originalPrices = [...febuary2023];
    setSortTool(febuary2023)
  }

// } 



hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".navLink").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
expenseForm.addEventListener("submit", getExpense);
incomeForm.addEventListener("submit", getIncome);


function getExpense(e) {
  e.preventDefault();

  if (expenseDate.value.slice(0, -3) !== '2023-01' && expenseDate.value.slice(0, -3) !== '2023-02' && expenseDate.value) {
    showErrorMessage(errorDateMessage)
    return;
  }
  if (expenseDescription.value.length > 50) {
    showErrorMessage(errorDescriptionMessage)
    return;
  }
  if (expenseCategory.value.length > 20) {
    showErrorMessage(errorCategoryMessage)
    return;
  }
  if (expensePrice.value.length > 9 || expensePrice.value < 100 && expensePrice.value) {
    showErrorMessage(errorPriceMessage)
    return;
  }

  if (
    !expenseDate.value ||
    !expenseDescription.value ||
    !expenseCategory.value ||
    !expensePrice.value ||
    !expenseTypeList.value
  ) {
    pointErrorBox([
      expenseDate,
      expenseDescription,
      expenseCategory,
      expensePrice,
      expenseTypeList
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
    typeList: typeList
  };

  allBudgetStorage.push(expenseValues);

  lastDate = expenseValues.date.slice(0, 7);
  expenseForm.reset();
  setCurrentDates(allBudgetStorage);
  generateDateList();
  showFilterDate();
    // setAllCalculations();
    // showTableEntries(allBudgetStorage);
  // location.reload();
}
function getIncome(e) {
  e.preventDefault();

  if (incomeDate.value.slice(0, -3) !== '2023-01' && incomeDate.value.slice(0, -3) !== '2023-02' && incomeDate.value) {
    showErrorMessage(errorDateMessage)
    return;
  }

  if (incomeDescription.value.length > 50) {
    showErrorMessage(errorDescriptionMessage)
    return;
  }
  if (incomeCategory.value.length > 20) {
    showErrorMessage(errorCategoryMessage)
    return;
  }
  if (incomePrice.value.length > 9 || incomePrice.value < 100) {
    showErrorMessage(errorPriceMessage)
    return;
  }

  if (
    !incomeDate.value ||
    !incomeDescription.value ||
    !incomeCategory.value ||
    !incomePrice.value
  ) {
    pointErrorBox([
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
    typeList: 'Ingresos'
  };

  allBudgetStorage.push(incomeValues);
  lastDate = incomeValues.date.slice(0, 7);
  incomeForm.reset();
  setCurrentDates(allBudgetStorage);
  generateDateList();
  showFilterDate();
  //   setAllCalculations();
  //   showTableEntries(allBudgetStorage);
  location.reload();
}

function pointErrorBox(inputs) {

  // if (inputs.length === 1) {
  
  //   console.log(1);
  //   inputs.forEach((input) => {
  //     input.classList.add("error-field");
  //     setTimeout(function () {
  //       input.classList.remove("error-field");
  //     }, 3000);   
  //   })
  
  //   showErrorMessage(errorDateMessage);
  // } else {
    const checkEmptyField = inputs.filter((input) => input.value === "");

    checkEmptyField.forEach((field) => {
      field.classList.add("error-field");
      setTimeout(function () {
        field.classList.remove("error-field");
      }, 3000);
    });
    showErrorMessage(mandatoryFieldMessage);
  // }
}

function showErrorMessage (errorMessage) {
  errorMessage.classList.add("show-message");
  errorMessage.classList.add("hide-error-message");

  setTimeout(function () {
    errorMessage.classList.remove("show-message");
    errorMessage.classList.remove("hide-error-message");
  }, 6000);


}



function setAllCalculations(currentBudget) {
  income = sumEntries("income", currentBudget);
  expense = sumEntries("expense", currentBudget);
  console.log(expense);
  voluntary = sumEntries("Voluntario", currentBudget)
  saving = sumEntries("Ahorro", currentBudget)
  mandatory = sumEntries("Obligatorio", currentBudget)
  balance = calculateBalance(income, expense);
  updateTotals();
}

function sumEntries(type, entries) {
  let sum = 0;
  if (type === 'income' || type === 'expense') {
    console.log(1);
    entries.forEach((entry) => {
      if (entry.type === type) {
        sum += entry.price;
      }
    });
    return sum;
  } else {
    console.log(2);
    entries.forEach((entry) => {
    if (entry.typeList === type) {
      console.log(entry.typeList);
      sum += entry.price;
    }
  })
  return sum;
}
}

function calculateBalance(income, expense) {
  return income - expense;
}

function updateTotals() {
  incomeTotal.innerHTML = income;
  expenseTotal.innerHTML = expense;
  balanceTotal.innerHTML = balance;
  savingTotal.innerHTML = saving;
  voluntaryTotal.innerHTML = voluntary;
  mandatoryTotal.innerHTML = mandatory;

  numbersToLetters();

  let numbersBalanceText = numbersBalance.textContent;
  let numbersIncomeText = numbersIncome.textContent;
  let numbersSavingText = numbersSaving.textContent;
  let numbersMandatoryText = numbersMandatory.textContent;
  let numbersVoluntaryText = numbersVoluntary.textContent;
  let numbersExpensesText = numbersExpenses.textContent;


  if (numbersBalanceText.includes("000000")) {
    showConvertedBalance.innerHTML += " DE PESOS";
  } else {
    showConvertedBalance.innerHTML += " PESOS";
  }

  if (numbersIncomeText.includes("000000")) {
    showConvertedIncome.innerHTML += " DE PESOS";
  } else {
    showConvertedIncome.innerHTML += " PESOS";
  }
  
  if (numbersSavingText.includes("000000")) {
    showConvertedSaving.innerHTML += " DE PESOS";
  } else {
    showConvertedSaving.innerHTML += " PESOS";
  }

  if (numbersMandatoryText.includes("000000")) {
    showConvertedMandatory.innerHTML += " DE PESOS";
  } else {
    showConvertedMandatory.innerHTML += " PESOS";
  }

  if (numbersVoluntaryText.includes("000000")) {
    showConvertedVoluntary.innerHTML += " DE PESOS";
  } else {
    showConvertedVoluntary.innerHTML += " PESOS";
  }
  if (numbersExpensesText.includes("000000")) {
    showConvertedExpenses.innerHTML += " DE PESOS";
  } else {
    showConvertedExpenses.innerHTML += " PESOS";
  }

  incomeTotal.innerHTML += " COP";
  savingTotal.innerHTML += " COP";
  voluntaryTotal.innerHTML += " COP";
  mandatoryTotal.innerHTML += " COP";
  balanceTotal.innerHTML += " COP";
  expenseTotal.innerHTML += " COP";
}


function setCurrentDates(allBudgetStorage) {

  // let moneyAdded = new Audio("../Audios/Poker-Chips-short.mp3");

  // moneyAdded.play();
  let getMonth = [];
  let getYear = [];
  let getMonthString = "";
  for (let i = 0; i < allBudgetStorage.length; i++) {
    getMonthString = allBudgetStorage[i].date.slice(5, 7);
    getYearString = allBudgetStorage[i].date.slice(0, -5);
    getMonth.push(Math.abs(getMonthString));
    getYear.push(allBudgetStorage[i].date.slice(0, -5));
  }
  uniqueYears = [...new Set(getYear)];
  uniqueMonths = [...new Set(getMonth)]
  
  if (getMonth.length > 2) {
    const copyMonth = uniqueMonths.findIndex(month => month == getMonthString)
    uniqueMonths.splice(copyMonth, 1)
    uniqueMonths.splice(uniqueMonths.length, 0, parseFloat(getMonthString))
  }
  if (getYear.length > 2) {
    const copyYear = uniqueYears.findIndex(years => years == getYearString)
    uniqueYears.splice(copyYear, 1)
    uniqueYears.splice(uniqueYears.length, 0, getYearString)
  }

  uniqueMonthFilter = uniqueMonths[uniqueMonths.length - 1];
  uniqueYearFilter = uniqueYears[uniqueYears.length - 1];
  // let moneyLost = new Audio("../Audios/coin-fail.mp3");
  // moneyLost.play();
  return [uniqueMonths, uniqueYears];
}

function generateDateList() {
  /* Months */
  monthList.innerHTML = '';
  if (uniqueMonths.length > 1) {  
    let lastMonthString = lastDate.slice(5, 7);
    const lastMonthIndex = uniqueMonths.findIndex(month => month == lastMonthString)
    uniqueMonths.splice(lastMonthIndex, 1)
    uniqueMonths.unshift(parseFloat(lastMonthString))
    // uniqueYears.splice(uniqueYears.length, 0, getYearString)
  }
 
  // uniqueMonths.reverse();
  
  for (let m = 0; m < uniqueMonths.length; m++) {
    monthsName.push(numberMonths[uniqueMonths[m]]);
    const monthOption = document.createElement("option");
    monthList.appendChild(monthOption);
    monthOption.innerHTML = `${numberMonths[uniqueMonths[m]]}`;
  }
  /* Years */
  yearList.innerHTML = "";
  
  if (uniqueYears.length > 1) {  
    let lastYearString = lastDate.slice(0, 5);
    const lastYearIndex = uniqueYears.findIndex(month => month == lastYearString)
    uniqueYears.splice(lastYearIndex, 1)
    uniqueYears.unshift(lastYearString)
    // uniqueYears.splice(uniqueYears.length, 0, getYearString)
  }
  // uniqueYears.reverse();
  for (let y = 0; y < uniqueYears.length; y++) {
    const yearOption = document.createElement("option");
    yearList.appendChild(yearOption);
    yearOption.innerHTML = `${uniqueYears[y].slice(0, -1)}`;
  }
}

function showMonthFiltered() {
  if (!generateDateList) {
    console.log('hola');
    return;
  }  
  savedLastDate = lastDate;
  let indexSelection = "";
  const indexMonth = monthIndex.findIndex(
    (monthIndex) => monthIndex === monthList.value
    );
    indexSelection = `-${indexMonth}-`;
    if (indexMonth < 10) {
      indexSelection = `-0${indexMonth}-`;
    }
    lastDate = yearList.value + indexSelection;
    const filterMonth = allBudgetStorage.filter((budget) =>
    budget.date.includes(lastDate)
    );
    if (filterMonth.length === 0) {
      table.innerHTML = '';
      setAllCalculations(filterMonth)
      showErrorMessage(noDateMessage);
      return indexSelection;
    }
    showTableEntries(filterMonth);
    setAllCalculations(filterMonth);
    sincronizeLastDate(lastDate);
    location.reload();
  return indexSelection;
}

function showYearFiltered() {
  if (!yearList.value) {
    return;
  }
  savedLastDate = lastDate;

    lastDate = yearList.value + showMonthFiltered();

    const filterYearMonth = allBudgetStorage.filter((budget) =>
      budget.date.includes(lastDate)
    );
    if (filterYearMonth.length === 0) {
      table.innerHTML = '';
      setAllCalculations(filterYearMonth)
      showErrorMessage(noDateMessage);
      return yearList.value;
      
    }

    showTableEntries(filterYearMonth);
    setAllCalculations(filterYearMonth);
    sincronizeLastDate(lastDate)
    location.reload();
    return yearList.value;
  // }
}

function showFilterDate() {

  let filterDate = allBudgetStorage.filter((budget) =>
  budget.date.includes(lastDate)
  );
  if (lastDate.includes('2022-12')) {
    december2022.push(filterDate)
    if (december2022.length > 1) {
      december2022 = december2022[december2022.length - 1]
    } else {
      december2022 = december2022[0];
    }
    sincronizeDecember2022();
  } else if (lastDate.includes('2023-01')) {
    january2023.push(filterDate)
    if (january2023.length > 1) {
      january2023 = january2023[january2023.length - 1]
    } else {
      january2023 = january2023[0];
    }
    sincronizeJanuary2023();
  } else if (lastDate.includes('2023-02')) {
    febuary2023.push(filterDate)
    if (febuary2023.length > 1) {
      febuary2023 = febuary2023[febuary2023.length - 1]
    } else {
      febuary2023 = febuary2023[0];
    }
    sincronizeFebuary2023();
  }
  showTableEntries(filterDate);
  setAllCalculations(filterDate);
  sincronizeLastDate(lastDate);
  sincronizeStorage();
}

function sincronizeStorage() {
  localStorage.setItem("globalBudgetSaved", JSON.stringify(allBudgetStorage));
}

function sincronizeDecember2022 () {
  localStorage.setItem("budgetDecember2022", JSON.stringify(december2022));
}
function sincronizeJanuary2023 () {
  localStorage.setItem("budgetJanuary2023", JSON.stringify(january2023));
}

function sincronizeFebuary2023 () {
  localStorage.setItem("budgetFebuary2023", JSON.stringify(febuary2023));
}

function sincronizeLastDate (lastDate) {
  localStorage.setItem("lastDate", JSON.stringify(lastDate));
}