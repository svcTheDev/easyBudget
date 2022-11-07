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
const priceColumnButton = document.querySelector("#sort-price .fas");
const categoryColumnButton = document.querySelector("#sort-category .fas");
const dateColumnButton = document.querySelector("#sort-date .fas");
const descriptionColumnButton = document.querySelector(
  "#sort-description .fas"
);

const focusButtons = document.querySelector(".buttons");

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");

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

let allBudgetStorage;
let balance,
  expense,
  income = [0, 0, 0];
let outcome_Entries = [];
let incomeValues = "";
let expenseValues = "";

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

priceColumnButton.addEventListener("click", sortByPrice);
categoryColumnButton.addEventListener("click", sortByCategory);
dateColumnButton.addEventListener("click", sortByDate);
descriptionColumnButton.addEventListener("click", sortByDescription);

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

  expenseValues = {
    id: Date.now(),
    type: "expense",
    date: expenseDate.value,
    description: expenseDescription.value,
    category: expenseCategory.value,
    price: parseFloat(expensePrice.value),
  };

  allBudgetStorage.push(expenseValues);

  expenseForm.reset();
  setAllCalculations();
  showTableEntries(allBudgetStorage);

  location.reload();
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

  incomeValues = {
    id: Date.now(),
    type: "income",
    date: incomeDate.value,
    description: incomeDescription.value,
    category: incomeCategory.value,
    price: parseFloat(incomePrice.value),
  };

  allBudgetStorage.push(incomeValues);

  incomeForm.reset();
  setAllCalculations();
  showTableEntries(allBudgetStorage);
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

function setAllCalculations() {
  income = sumEntries("income", allBudgetStorage);
  expense = sumEntries("expense", allBudgetStorage);
  balance = calculateBalance(income, expense);

  updateTotals();
  sincronizeStorage();
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
    <td id="date-field ${
      budget.id
    }" class="size edit-field"><i class='far fa-clone duplicate-icon'></i>    
    ${getDayWeek(new Date(budget.date))} ${
      budget.date
    }<i class="specialDate fa-solid fa-pencil"></i>
        <td id="description-field ${budget.id}" class="size edit-field">${
      budget.description
    }<i class="fa-solid fa-pencil"></i></td>
        <td id="category-field ${budget.id}" class="size edit-field">${
      budget.category
    }<i class="fa-solid fa-pencil"></i></td>
        <td id="price-field ${
          budget.id
        }" class="size edit-field ${selectClass}">${
      budget.price
    }<i class="fa-solid fa-pencil"></i></td>
        <td id="delete">Delete</td>
        `;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");

    // table.appendChild(row);
    table.insertAdjacentHTML("afterbegin", row);
    // row.appendChild(deleteBtn);

    document.querySelector("#delete").onclick = () => {
      confirmation.focus({ focusVisible: true });
      document.onkeydown = function (e) {
        if (event.keyCode === 39) {
          cancelation.focus({ focusVisible: true });
        } else if (event.keyCode === 37) {
          confirmation.focus({ focusVisible: true });
        }
      };

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

searchTool.focus({ focusVisible: true });
searchTool.addEventListener("keyup", function (e) {
  let valueSearch = this.value;

  let dataToReturn = searchTable(valueSearch, allBudgetStorage);
  showTableEntries(dataToReturn);
  showFilterTotal(dataToReturn);
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

      if (
        valueSearch === priceString &&
        valueSearch.length === priceString.length
      ) {
        /* When the number of digits is equal than the table ones*/
        filterData = [];
        console.log(1);
        filterData.push(data);
      } else if (priceString.includes(valueSearch)) {
        /* just by writing any number */
        console.log(2);
        filterData.push(data);
      } else if (
        lowerDescription.includes(valueSearch) ||
        date.includes(valueSearch) ||
        lowercategory.includes(valueSearch)
      ) {
        /* Just by writing any letter, no numbers */
        console.log(3);
        filterData.push(data);
      }
    });
    return filterData;
  }
  /* To auto refresh once someone stop searching */
  this.onkeydown = function (e) {
    if (e.keyCode === 8) {
      if (this.value.length <= 1) {
        location.reload();
      } else {
        return;
      }
    }
  };
});

function showFilterTotal(autoTotal) {
  console.log(autoTotal);
  incomeFilter = sumEntries("income", autoTotal);
  ExpenseFilter = sumEntries("expense", autoTotal);
  balanceFilter = calculateBalance(incomeFilter, ExpenseFilter);
  console.log(searchTool.value);
  if(!searchTool.value) {
    document.querySelector(
      ".autoPrice"
    ).innerHTML = '';
    return;
  }
  document.querySelector(
    ".autoPrice"
  ).innerHTML = `<p class="record-income"><span>Ingresos:</span> ${incomeFilter} COP</p><p class="record-outcome"><span>Gastos:</span> ${ExpenseFilter} COP</p><p><span>Balance:</span> ${balanceFilter} COP</p>`;
}

let indexPrice = 0;
function sortByPrice() {
  if (searchTool.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexPrice === 0) {
      let sorted = allBudgetStorage.sort((a, b) =>
        a.price > b.price ? 1 : a.price < b.price ? -1 : 0
      );
      priceColumnButton.classList.add("fa-caret-up");
      priceColumnButton.classList.remove("fa-sort");
      console.log(sorted);
      showTableEntries(sorted);
      indexPrice++;
    } else if (indexPrice === 1) {
      let sorted2 = allBudgetStorage.sort((a, b) =>
        a.price < b.price ? 1 : a.price > b.price ? -1 : 0
      );
      priceColumnButton.classList.add("fa-caret-down");
      priceColumnButton.classList.remove("fa-caret-up");
      console.log(sorted2);
      showTableEntries(sorted2);
      indexPrice++;
    } else if (indexPrice === 2) {
      priceColumnButton.classList.add("fa-sort");
      priceColumnButton.classList.remove("fa-caret-down");
      // console.log(originalPrices);
      // showTableEntries(originalPrices);
      indexPrice = 0;
      location.reload();
    }
  }
}

let indexCategory = 0;
function sortByCategory() {
  if (searchTool.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexCategory === 0) {
      categoryColumnButton.classList.add("fa-caret-up");
      categoryColumnButton.classList.remove("fa-sort");
      let sorted = allBudgetStorage.sort((a, b) =>
        a.category > b.category ? 1 : a.category < b.category ? -1 : 0
      );
      console.log(sorted);
      showTableEntries(sorted);
      indexCategory++;
    } else if (indexCategory === 1) {
      categoryColumnButton.classList.add("fa-caret-down");
      categoryColumnButton.classList.remove("fa-caret-up");
      let sorted2 = allBudgetStorage.sort((a, b) =>
        a.category < b.category ? 1 : a.category > b.category ? -1 : 0
      );
      console.log(sorted2);
      showTableEntries(sorted2);
      indexCategory++;
    } else if (indexCategory === 2) {
      categoryColumnButton.classList.add("fa-sort");
      categoryColumnButton.classList.remove("fa-caret-down");
      // console.log(originalPrices);
      // showTableEntries(originalPrices);
      indexCategory = 0;
      location.reload();
    }
  }
}

let indexDate = 0;
function sortByDate() {
  if (searchTool.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexDate === 0) {
      dateColumnButton.classList.add("fa-caret-up");
      dateColumnButton.classList.remove("fa-sort");
      let sorted = allBudgetStorage.sort((a, b) =>
        a.date > b.date ? 1 : a.date < b.date ? -1 : 0
      );
      console.log(sorted);
      showTableEntries(sorted);
      indexDate++;
    } else if (indexDate === 1) {
      dateColumnButton.classList.add("fa-caret-down");
      dateColumnButton.classList.remove("fa-caret-up");
      let sorted2 = allBudgetStorage.sort((a, b) =>
        a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      );
      console.log(sorted2);
      showTableEntries(sorted2);
      indexDate++;
    } else if (indexDate === 2) {
      dateColumnButton.classList.add("fa-sort");
      dateColumnButton.classList.remove("fa-caret-down");
      // console.log(originalPrices);
      // showTableEntries(originalPrices);
      indexDate = 0;
      location.reload();
    }
  }
}
let indexDescription = 0;
function sortByDescription() {
  if (searchTool.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexDescription === 0) {
      descriptionColumnButton.classList.add("fa-caret-up");
      descriptionColumnButton.classList.remove("fa-sort");
      let sorted = allBudgetStorage.sort((a, b) =>
        a.description > b.description
          ? 1
          : a.description < b.description
          ? -1
          : 0
      );
      console.log(sorted);
      showTableEntries(sorted);
      indexDescription++;
    } else if (indexDescription === 1) {
      descriptionColumnButton.classList.add("fa-caret-down");
      descriptionColumnButton.classList.remove("fa-caret-up");
      let sorted2 = allBudgetStorage.sort((a, b) =>
        a.description < b.description
          ? 1
          : a.description > b.description
          ? -1
          : 0
      );
      console.log(sorted2);
      showTableEntries(sorted2);
      indexDescription++;
    } else if (indexDescription === 2) {
      descriptionColumnButton.classList.add("fa-sort");
      descriptionColumnButton.classList.remove("fa-caret-down");
      // console.log(originalPrices);
      // showTableEntries(originalPrices);
      indexDescription = 0;
      location.reload();
    }
  }
}

document.querySelectorAll(".fa-pencil").forEach((pencil) => {
  pencil.addEventListener("click", convertToInput);
});

document.querySelectorAll(".edit-field").forEach((rows) => {
  rows.addEventListener("click", getCloneRow);
});

document.querySelectorAll(".specialDate").forEach((dates) => {
  dates.addEventListener("click", setNewDate);
});

function setNewDate(e) {
  let iconDateParent = this.parentElement;

  if (iconDateParent.hasAttribute("data-clicked")) {
    return;
  }
  iconDateParent.setAttribute("data-clicked", "yes");
  iconDateParent.setAttribute("data-text", iconDateParent.textContent);

  let inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.value = iconDateParent.textContent;
  inputDate.classList.add("onEdit");
  this.classList.remove("size");

  inputDate.onblur = function (e) {
    let dateTd = inputDate.parentElement;
    let original_date = inputDate.parentElement.getAttribute("data-text");
    let current_date = this.value;
    let dateParentId = parseFloat(e.target.parentElement.id.slice(-13));

    if (current_date !== "") {
      dateTd.removeAttribute("data-clicked");
      dateTd.removeAttribute("data-text");
      dateTd.innerHTML = current_date + `<i class="fa-solid fa-pencil">`;

      const checkDateId = allBudgetStorage.find(
        (values) => values.id === dateParentId
      );
      console.log(checkDateId);
      delete checkDateId.date;
      checkDateId.date = current_date;
      console.log(checkDateId);
      showTableEntries(allBudgetStorage);
      sincronizeStorage();

      console.log(original_date + " is changed to " + current_date);
      location.reload();
    } else {
      dateTd.removeAttribute("data-clicked");
      dateTd.removeAttribute("data-text");
      dateTd.innerHTML = original_date + `<i class="fa-solid fa-pencil">`;
      iconDateParent.classList.add("size");
    }
  };
  inputDate.onkeypress = function () {
    if (event.keyCode === 13) {
      this.blur();
      location.reload();
    }
  };
  iconDateParent.innerHTML = "";
  iconDateParent.append(inputDate);
  iconDateParent.firstElementChild.select();
}

function convertToInput(e) {
  let iconParent = this.parentElement;

  if (this.className.includes("specialDate")) {
    return;
  }

  if (iconParent.hasAttribute("data-clicked")) {
    return;
  }
  iconParent.setAttribute("data-clicked", "yes");
  iconParent.setAttribute("data-text", iconParent.textContent);

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = iconParent.textContent;
  input.classList.add("onEdit");
  iconParent.classList.remove("size");

  input.onblur = function (e) {
    iconParent.classList.add("size");
    let td = input.parentElement;
    console.log(input.parentElement);
    let original_text = input.parentElement.getAttribute("data-text");
    let current_text = this.value;
    let savedParentId = parseFloat(e.target.parentElement.id.slice(-13));
    let savedParentType = e.target.parentElement.id.slice("", -20);

    if (original_text !== current_text) {
      td.removeAttribute("data-clicked");
      td.removeAttribute("data-text");
      td.innerHTML = current_text + `<i class="fa-solid fa-pencil">`;

      const checkId = allBudgetStorage.find(
        (values) => values.id === savedParentId
      );
      if (savedParentType === "description") {
        if (current_text.length > 50 || current_text.length === 0) {
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = original_text;
          return;
        }
        delete checkId.description;
        checkId.description = current_text;
        sincronizeStorage();
      }

      if (savedParentType === "category") {
        if (current_text.length > 20 || current_text.length === 0) {
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = original_text;
          return;
        }
        delete checkId.category;
        checkId.category = current_text;
        sincronizeStorage();
      }
      if (savedParentType === "price") {
        if (current_text.length > 9 || current_text.length === 0) {
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = original_text;
          return;
        }
        delete checkId.price;
        checkId.price = parseFloat(current_text);
        sincronizeStorage();
      }
      // location.reload();
    } else {
      td.removeAttribute("data-clicked");
      td.removeAttribute("data-text");
      td.innerHTML = original_text + `<i class="fa-solid fa-pencil">`;
      // location.reload();
    }
  };

  input.onkeypress = function () {
    if (event.keyCode === 13) {
      this.blur();
      // location.reload();{
    }
  };
  input.onkeydown = function (e) {
    if (e.keyCode === 9) {
      // location.reload();{
    }
  };
  iconParent.innerHTML = "";
  iconParent.append(input);
  iconParent.firstElementChild.select();
}

document.querySelectorAll(".duplicate-icon").forEach((icons) => {
  icons.addEventListener("click", getCloneRow);
});

function getCloneRow(e) {
  if (!e.target.className.includes("duplicate-icon")) {
    return;
  }

  let rowId = parseFloat(this.parentElement.id.slice(-13));
  const indexRow = allBudgetStorage.findIndex((values) => values.id === rowId);

  const rowById = allBudgetStorage.find((values) => values.id === rowId);

  let stringRow = JSON.stringify(rowById);
  let cloneRow = JSON.parse(stringRow);

  delete cloneRow.id;
  cloneRow.id = Date.now();
  insertCloneRow(allBudgetStorage, indexRow, cloneRow);
  showTableEntries(allBudgetStorage);
  sincronizeStorage();

  location.reload();
}

function insertCloneRow(allBudgetStorage, index, ...elementsArray) {
  allBudgetStorage.splice(index, 0, ...elementsArray);
}

let rowLength = 0;
let indexArrayGrab = 0;
document.querySelectorAll("tbody tr").forEach((tr) => {
  tr.setAttribute("draggable", "true");
  tr.classList.add("draggable");
  rowLength++;
  tr.addEventListener("dragstart", function () {
    tr.classList.add("dragging");

    let rowIdStart = parseFloat(tr.firstElementChild.id.slice(-13));
    indexArrayGrab = allBudgetStorage.findIndex(
      (index) => index.id === rowIdStart
    );
  });

  tr.addEventListener("dragend", function () {
    tr.classList.remove("dragging");
    let indexTr = rowLength;
    document.querySelectorAll("tbody tr").forEach((newTr) => {
      indexTr--;
      newTr.setAttribute("id", indexTr);
    });
    let rowIdEnd = parseFloat(tr.firstElementChild.id.slice(-13));

    const rowObj = allBudgetStorage.find((obj) => obj.id === rowIdEnd);
    let indexRow = parseFloat(tr.id);

    if (indexRow === 0 || indexArrayGrab > indexRow) {
      indexRow;
    } else {
      indexRow = parseFloat(tr.id) + 1;
    }

    insertDragRow(allBudgetStorage, indexRow, rowObj);

    let newBudget = JSON.stringify(allBudgetStorage);
    allBudgetStorage = JSON.parse(newBudget);

    if (indexArrayGrab === 0 || indexArrayGrab < indexRow) {
      console.log("uno");
      allBudgetStorage.splice(parseFloat(indexArrayGrab), 1);
    } else {
      console.log("dos");
      allBudgetStorage.splice(parseFloat(indexArrayGrab + 1), 1);
    }
    console.log(allBudgetStorage);
    sincronizeStorage();
  });
});

function insertDragRow(allBudgetStorage, index, ...elementsArray) {
  allBudgetStorage.splice(index, 0, ...elementsArray);
}

table.addEventListener("dragover", setRowsToDrag);

function setRowsToDrag(e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(table, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    table.appendChild(draggable);
  } else {
    table.insertBefore(draggable, afterElement);
  }
}

function getDragAfterElement(table, y) {
  const draggableElements = [
    ...table.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// document.querySelectorAll('#months option').forEach((months) => {


//   months.addEventListener('click', function (e){
//     console.log('h');
//     console.log(months);
//     // if (e.target === 'Option 1') {
//     //   console.log('hola');
//     // } else {
//     //   console.log(2);
//     // }

//   })
// });


function getMonthSelected () {
  const months = document.getElementById('months').value;
  if (months === 'Option 1') {
    console.log(1); 
  } else {
    console.log(2);
  }
}


// months.addEventListener('click', function (e){
//   console.log(e.target.options[1].value);
  
// })


function sincronizeStorage() {
  localStorage.setItem("budgetSaved", JSON.stringify(allBudgetStorage));
}


