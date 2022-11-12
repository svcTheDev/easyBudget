

// * 1 -  — Gets the expenses and income entries of the user */ 
 
// * 2 - — Get the filterDate in order to print the table */

// — Updates the incomes, expenses, and balance automatically
// — Translates automatically the totals into words
// — Instant search tool of the entries on the table
// — Sorts function on all the 4 categories
// — Deletes dynamically the rows by clicking the delete button
// — Edit function to change entry rows manually
// — Clones rows by clicking the clone icon
// — Organize by month

expenseForm.addEventListener("submit", getExpense);
incomeForm.addEventListener("submit", getIncome);

function getExpense(e) {
  e.preventDefault();
  let moneyLost = new Audio("../Audios/coin-fail.mp3");
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
  // location.reload();
}
function getIncome(e) {
  e.preventDefault();

  let moneyAdded = new Audio("../Audios/Poker-Chips-short.mp3");

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
  // location.reload();
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


function setAllCalculations(currentBudgqet) {
  income = sumEntries("income", currentBudgqet);
  expense = sumEntries("expense", currentBudgqet);
  balance = calculateBalance(income, expense);

  updateTotals();
  // sincronizeStorage();
}

function sumEntries(type, entries) {
  let sum = 0;
  entries.forEach((entry) => {
    if (entry.type === type) {
      sum += entry.price;
    }
  });
  return sum;
}

function calculateBalance(income, expense) {
  return income - expense;
}

function updateTotals() {
  incomeTotal.innerHTML = income;
  expenseTotal.innerHTML = expense;
  balanceTotal.innerHTML = balance;

  numbersToLetters();

  let numbersBalanceText = numbersBalance.textContent;
  let numbersIncomeText = numbersIncome.textContent;
  let numbersOutcomeText = numbersOutcome.textContent;

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
  if (numbersOutcomeText.includes("000000")) {
    showConvertedOutcome.innerHTML += " DE PESOS";
  } else {
    showConvertedOutcome.innerHTML += " PESOS";
  }
  incomeTotal.innerHTML += " COP";
  expenseTotal.innerHTML += " COP";
  balanceTotal.innerHTML += " COP";
}

let uniqueMonths = [];
let uniqueYears = [];
function setCurrentDates() {
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
  return [uniqueMonths, uniqueYears];
}
// TODO Use if in the last element of the loop to push it in the last

function generateDateList() {
  /* Months */
  monthList.innerHTML = '';
uniqueMonths.reverse();
  for (let m = 0; m < uniqueMonths.length; m++) {
    monthsName.push(numberMonths[uniqueMonths[m]]);
    const monthOption = document.createElement("option");
    monthList.appendChild(monthOption);
    monthOption.innerHTML = `${numberMonths[uniqueMonths[m]]}`;
  }
  /* Years */
  yearList.innerHTML = "";
  uniqueYears.reverse();
  for (let y = 0; y < uniqueYears.length; y++) {
    const yearOption = document.createElement("option");
    yearList.appendChild(yearOption);
    yearOption.innerHTML = `${uniqueYears[y].slice(0, -1)}`;
  }
  showFilterDate(uniqueMonthFilter, uniqueYearFilter);
}

function showMonthFiltered() {
  if (!generateDateList) {
    return;
  }
  let indexSelection = "";
  // if (monthsName.includes(monthList.value)) {
    const indexMonth = monthIndex.findIndex(
      (monthIndex) => monthIndex === monthList.value
      );
    indexSelection = `-${indexMonth}-`;
    if (indexMonth < 10) {
      indexSelection = `-0${indexMonth}-`;
    }
    let date = yearList.value + indexSelection;
    const filterMonth = allBudgetStorage.filter((budget) =>
      budget.date.includes(date)
    );
    showTableEntries(filterMonth);
    setAllCalculations(filterMonth);
  // }
  return indexSelection;
}

function showYearFiltered() {
  if (!yearList.value) {
    return;
  }

  // if (yearIndex.includes(yearList.value)) {
    let date = yearList.value + showMonthFiltered;
    const filterYearMonth = allBudgetStorage.filter((budget) =>
      budget.date.includes(date)
    );
    showTableEntries(filterYearMonth);
    setAllCalculations(filterYearMonth);
    return yearList.value;
  // }
}




function showFilterDate(month, year) {
  if (month < 10) {
    month = `0${month}-`;
  }
  
  let date = year + month;
  let filterDate = allBudgetStorage.filter((budget) =>
  budget.date.includes(date)
  );
  showTableEntries(filterDate);
  setAllCalculations(filterDate);

  

}
