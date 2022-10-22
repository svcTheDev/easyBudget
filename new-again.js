/*
 * 1 - Take the values form the expense form in a function
 * 2 - Create a functino to display an error if there is at least one missing field
 * 3 - Create expense object and income and add it to a main array
 * 4 - Create a function to join expenses and income
 * 5 - Sum entries and caclulate balance
 * 6 - Update totals
 * 7 - Show table
 */

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

const errorMessageBox = document.querySelector(".error-message");
const modalContainer = document.querySelector(".modal-container");
const confirmation = document.querySelector(".confirm");
const cancelation = document.querySelector(".cancel");

const incomeTotal = document.querySelector(".income p");
const expenseTotal = document.querySelector(".outcome p");
const balanceTotal = document.querySelector(".balance p");

const searchTool = document.querySelector(".search__input");
const table = document.querySelector("#table-body");
const priceColumnButton = document.querySelector("#sort-price");
const categoryColumnButton = document.querySelector("#sort-category");
const dateColumnButton = document.querySelector("#sort-date");
const descriptionColumnButton = document.querySelector("#sort-description");

let allBudgetStorage;
let balance,
  expense,
  income = [0, 0, 0];
let outcome_Entries = [];

incomePrice.addEventListener("keydown", blockKeys);
expensePrice.addEventListener("keydown", blockKeys);

function blockKeys(e) {
  if (
    [
      "Space",
      "Slash",
      "KeyE",
      "Period",
      "BracketRight",
      "BracketLeft",
      "Comma",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ].indexOf(e.code) > -1
  ) {
    e.preventDefault();
  }
  false;
}

allBudgetStorage = JSON.parse(localStorage.getItem("budgetSaved")) || [];
setAllCalculations();
showTableEntries(allBudgetStorage);
expenseForm.addEventListener("submit", getExpense);
incomeForm.addEventListener("submit", getIncome);

function sorts(filterData) {
  if (filterData) {
    return;
  } else {
    priceColumnButton.addEventListener("click", sortByPrice);
    categoryColumnButton.addEventListener("click", sortByCategory);
    dateColumnButton.addEventListener("click", sortByDate);
    descriptionColumnButton.addEventListener("click", sortByDescription);
  }
}

sorts();

let originalPrices = [...allBudgetStorage];

function getExpense(e) {
  e.preventDefault();

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

  let expense = {
    id: Date.now(),
    type: "expense",
    date: expenseDate.value,
    description: expenseDescription.value,
    category: expenseCategory.value,
    price: parseFloat(expensePrice.value),
  };

  allBudgetStorage.push(expense);

  expenseForm.reset();
  setAllCalculations();
  showTableEntries(allBudgetStorage);
}

function getIncome(e) {
  e.preventDefault();

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

  let income = {
    id: Date.now(),
    type: "income",
    date: incomeDate.value,
    description: incomeDescription.value,
    category: incomeCategory.value,
    price: parseFloat(incomePrice.value),
  };

  allBudgetStorage.push(income);

  incomeForm.reset();
  setAllCalculations();
  showTableEntries(allBudgetStorage);
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

function setAllCalculations() {
  income = sumEntries("income", allBudgetStorage);
  expense = sumEntries("expense", allBudgetStorage);
  balance = calculateBalance(income, expense);

  updateTotals();
  sincronizeStorage();
  // numbersToLetters();
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

  numbersToLetters()

  let numbersBalanceText =  numbersBalance.textContent;
  let numbersIncomeText =  numbersIncome.textContent;
  let numbersOutcomeText =  numbersOutcome.textContent;

  if (numbersBalanceText.includes('000000')) {
    showConvertedBalance.innerHTML += ' DE PESOS'
  } else {
    showConvertedBalance.innerHTML += ' PESOS'
  }
  if (numbersIncomeText.includes('000000')) {
    showConvertedIncome.innerHTML += ' DE PESOS'
  } else {
    showConvertedIncome.innerHTML += ' PESOS'
  }
  if (numbersOutcomeText.includes('000000')) {
    showConvertedOutcome.innerHTML += ' DE PESOS'
  } else {
    showConvertedOutcome.innerHTML += ' PESOS'
  }
  incomeTotal.innerHTML += ' COP'
  expenseTotal.innerHTML += ' COP'
  balanceTotal.innerHTML += ' COP'
}

function getDayWeek(date) {
  const days = {
    0: "Lunes",
    1: "Martes",
    2: "Miercoles",
    3: "Jueves",
    4: "Viernes",
    5: "Sábado",
    6: "Domingo",
  };
  return days[date.getDay()];
}

let budgetID = "";

function showTableEntries(allBudgetStorage) {
  table.innerHTML = "";
  allBudgetStorage.forEach((budget) => {
    // const row = document.createElement("tr");
    let selectClass =
      budget.type === "income" ? "record-income" : "record-outcome";

    const row = `
        <td class="size">${getDayWeek(new Date(budget.date))} ${
      budget.date
    }</td>
        <td class="size">${budget.description}</td>
        <td class="size">${budget.category}</td>
        <td class="size ${selectClass}">${budget.price}</td>
        <td id="delete">Delete</td>
        `;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");

    // table.appendChild(row);
    table.insertAdjacentHTML("afterbegin", row);
    // row.appendChild(deleteBtn);

    document.querySelector("#delete").onclick = () => {
      modalContainer.classList.add("show-confirmation");
      budgetID = budget.id;
    };
  });
}

modalContainer.addEventListener("click", discardModal);

function discardModal(e) {
  console.log(e.target.className);
  if (e.target.className !== "modalP" && e.target.className !== "modal") {
    modalContainer.classList.add("modal-inactive");
    modalContainer.classList.remove("show-confirmation");
  } else {
    return;
  }
}

confirmation.addEventListener("click", function () {
  deleteRow(budgetID);
  modalContainer.classList.add("modal-inactive");
  modalContainer.classList.remove("show-confirmation");
});

cancelation.addEventListener("click", function () {
  modalContainer.classList.add("modal-inactive");
  modalContainer.classList.remove("show-confirmation");
});

function deleteRow(id) {
  allBudgetStorage = allBudgetStorage.filter((budget) => budget.id !== id);
  showTableEntries(allBudgetStorage);
  setAllCalculations();
}

// let copyBudget = [...allBudgetStorage]

// showTableEntries(copyBudget)

searchTool.addEventListener("keyup", function (e) {
  let valueSearch = this.value;

  let dataToReturn = searchTable(valueSearch, allBudgetStorage);
  showTableEntries(dataToReturn);
  sorts(dataToReturn);
  function searchTable(valueSearch, dataToReturn) {
    let filterData = [];
    dataToReturn.forEach((data) => {
      valueSearch = valueSearch.toLowerCase();
      let description = data.description;
      let lowerDescription = description.toLowerCase();
      let category = data.category;
      let lowercategory = category.toLowerCase();
      let date = data.date;
      let price = data.price;
      let priceString = price.toString();


      if (valueSearch === priceString &&
        valueSearch.length === priceString.length) { /* When the number of digits is equal than the table ones*/
          filterData = [];
          console.log(1);
          filterData.push(data);
        } else if ( 
          priceString.includes(valueSearch)
          ) { /* just by writing any number */
            console.log(2);
            filterData.push(data);
          } else if (
            lowerDescription.includes(valueSearch) ||
            date.includes(valueSearch) ||
            lowercategory.includes(valueSearch)
            ) { /* Just by writing any letter, no numbers */
        console.log(3);
        filterData.push(data);
      }
    });
    return filterData;
  }
});

let indexPrice = 0;
function sortByPrice() {
  console.log(originalPrices);
  if (indexPrice === 0) {
    let sorted = allBudgetStorage.sort((a, b) =>
      a.price > b.price ? 1 : a.price < b.price ? -1 : 0
    );

    console.log(sorted);
    showTableEntries(sorted);
    indexPrice++;
  } else if (indexPrice === 1) {
    let sorted2 = allBudgetStorage.sort((a, b) =>
      a.price < b.price ? 1 : a.price > b.price ? -1 : 0
    );

    console.log(sorted2);
    showTableEntries(sorted2);
    indexPrice++;
  } else if (indexPrice === 2) {
    console.log(originalPrices);
    showTableEntries(originalPrices);
    indexPrice = 0;
  }
}

let indexCategory = 0;
function sortByCategory() {
  console.log(originalPrices);
  if (indexCategory === 0) {
    let sorted = allBudgetStorage.sort((a, b) =>
      a.category > b.category ? 1 : a.category < b.category ? -1 : 0
    );
    console.log(sorted);
    showTableEntries(sorted);
    indexCategory++;
  } else if (indexCategory === 1) {
    let sorted2 = allBudgetStorage.sort((a, b) =>
      a.category < b.category ? 1 : a.category > b.category ? -1 : 0
    );
    console.log(sorted2);
    showTableEntries(sorted2);
    indexCategory++;
  } else if (indexCategory === 2) {
    console.log(originalPrices);
    showTableEntries(originalPrices);
    indexCategory = 0;
  }
}

let indexDate = 0;
function sortByDate() {
  console.log(originalPrices);
  if (indexDate === 0) {
    let sorted = allBudgetStorage.sort((a, b) =>
      a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    );
    console.log(sorted);
    showTableEntries(sorted);
    indexDate++;
  } else if (indexDate === 1) {
    let sorted2 = allBudgetStorage.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    );
    console.log(sorted2);
    showTableEntries(sorted2);
    indexDate++;
  } else if (indexDate === 2) {
    console.log(originalPrices);
    showTableEntries(originalPrices);
    indexDate = 0;
  }
}
let indexDescription = 0;
function sortByDescription() {
  console.log(originalPrices);
  if (indexDescription === 0) {
    let sorted = allBudgetStorage.sort((a, b) =>
      a.description > b.description ? 1 : a.description < b.description ? -1 : 0
    );
    console.log(sorted);
    showTableEntries(sorted);
    indexDescription++;
  } else if (indexDescription === 1) {
    let sorted2 = allBudgetStorage.sort((a, b) =>
      a.description < b.description ? 1 : a.description > b.description ? -1 : 0
    );
    console.log(sorted2);
    showTableEntries(sorted2);
    indexDescription++;
  } else if (indexDescription === 2) {
    console.log(originalPrices);
    showTableEntries(originalPrices);
    indexDescription = 0;
  }
}

function sincronizeStorage() {
  localStorage.setItem("budgetSaved", JSON.stringify(allBudgetStorage));
}