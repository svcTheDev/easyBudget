/* 
* Variables */
/* Table */
// const tableData = document.querySelector('tbody');
const tbody = document.querySelector('#table-body');

/* Outcome record */
const dateOutcomeEl = document.querySelector('#dateOutcome');
const descriptionExpenseEl = document.querySelector('#descriptionOutcome');
const categoryExpenseEl = document.querySelector('#categoryOutcome');
const priceExpenseEl = document.querySelector('#priceOutcome');
const btnExpenseEl = document.querySelector('.btnOutcome');
// * Income record */
const dateIncomeEl = document.querySelector('#dateIncome');
const descriptionIncomeEl = document.querySelector('#descriptionIncome');
const categoryIncomeEl = document.querySelector('#categoryIncome');
const priceIncomeEl = document.querySelector('#priceIncome');
const btnIncomeEl = document.querySelector('.btnIncome');
const outcomeForm = document.querySelector('#outcomeBtn');

/* Financial summary */
const balanceEl = document.querySelector('.balance p');
const incomeEl = document.querySelector('.income p');
const outcomeEl = document.querySelector('.outcome p');
const incomeForm = document.querySelector('#income-form');
/* Dynamic classes */
const messageBox = document.querySelector('.xd-message');

/* Arrays */
let outcome_Entries = [];
let outcomePrices = [];
let outcomeTotal;
// let info_Entries = [];
// let info_Entries = [];

/* Images */
let salarioImage = '<img class="image" src="salary.png" alt="">';
let bonosImage = '<img class="image" src="bonos.png" alt="">';
let ayudasImage = '<img class="image" src="ayudas.png" alt="">';
let comidaImage = '<img class="image" src="pizza.png" alt="">';
let personalImage = '<img class="image" src="personal2.png" alt="">';
let ropaImage = '<img class="image" src="ropa.png" alt="">';

/* 
* AddEventListeners */

eventListeners();

function eventListeners() {
    outcomeForm.addEventListener('submit', addOutcomeEntries)

    incomeForm.addEventListener('submit', addIncomeEntries)

    document.addEventListener('DOMContentLoaded', () => {
      outcome_Entries = JSON.parse(localStorage.getItem('savedOutcomeEntries')) || [];
      outcomeHtml();
      outcomeTotal = JSON.parse(localStorage.getItem('savedOutcomeTotal')) || '0';
      outcomeEl.textContent = outcomeTotal;
    })
}

// * Functions 

function addOutcomeEntries (e) {
    e.preventDefault();
    console.log(outcomeEl);

    if (!dateOutcomeEl.value || !descriptionExpenseEl.value || !categoryExpenseEl.value || !priceExpenseEl.value) {

      errorMessage();

    return;
  }
    // Error message
   

    let expense = {
        id: Date.now(),
        date: dateOutcomeEl.value,
        description: descriptionExpenseEl.value,
        category: categoryExpenseEl.value,
        price: priceExpenseEl.value
      }
      
      outcome_Entries = [...outcome_Entries, expense]
      outcomeHtml();
      
      outcomePrices = [...outcomePrices, expense.price];
      console.log(outcomePrices);

      calculateOutcome();

      outcomeForm.reset();
}

function addIncomeEntries (e) {
    e.preventDefault();
   
    // Error message
    incomeForm.reset();
}

// Get days of the week
function getDayWeek(date) {
    const days = {
      0: 'Lunes',
      1: 'Martes',
      2: 'Miercoles',
      3: 'Jueves',
      4: 'Viernes',
      5: 'Sábado',
      6: 'Domingo'
    };
      return days[date.getDay()];
  }

function outcomeHtml () {
  clearRows();
    if(outcome_Entries.length > 0) {
        outcome_Entries.forEach(outcomeEntry => {

        const row = document.createElement('tr')
        row.innerHTML += 
        
        `
        <td class="record-outcome">${getDayWeek(new Date(dateOutcomeEl.value))} ${outcomeEntry.date}</td>
        <td class="record-outcome">${outcomeEntry.description}</td>
        <td class="record-outcome">${outcomeEntry.category} ${comidaImage}</td>
        <td class="record-outcome">${outcomeEntry.price}</td>
        
        `

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete')

        tbody.appendChild(row)
        row.appendChild(deleteBtn)

        deleteBtn.onclick = () => {
            deleteRow(outcomeEntry.id);
        }
  

      //   if(outcomeEl.textContent === '0') {
      //     outcomeEl.textContent = outcomeEntry.price + ' COP';
      // } else {
      //   outcomeEl.textContent = outcomeEl.textContent + outcomeEntry.price;
      // }      
      });


      }
      savingOutcomeEntries();
}

function savingOutcomeEntries () {
  localStorage.setItem('savedOutcomeEntries', JSON.stringify(outcome_Entries))
}

function savingOutcomeTotal () {
  localStorage.setItem('savedOutcomeTotal', JSON.stringify(outcomeTotal))
}

function deleteRow(id) {
    outcome_Entries = outcome_Entries.filter(entries => entries.id !== id)
    outcomeHtml();
    outcomePrices.pop();
    console.log(outcomePrices);
    calculateOutcome();
}


function clearRows() {
    while(tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
    }
}



function calculateOutcome() {
  if (outcomeEl.textContent === '0') {
    outcomeTotal =  parseFloat(outcomePrices[0]);
    outcomeEl.textContent = parseFloat(outcomePrices[0]);
    savingOutcomeTotal();
  } else {
    if (outcomePrices.length === 2) {
      outcomeTotal = parseFloat(outcomeEl.textContent) + parseFloat(outcomePrices[1]);
      outcomeEl.textContent = parseFloat(outcomeEl.textContent) + parseFloat(outcomePrices[1]);
      savingOutcomeTotal();
    } else { 
      outcomeTotal = parseFloat(outcomeEl.textContent) + parseFloat(outcomePrices[outcomePrices.length - 1]);
      outcomeEl.textContent = parseFloat(outcomeEl.textContent) + parseFloat(outcomePrices[outcomePrices.length - 1]);
      savingOutcomeTotal();
  }


}
}



function errorMessage () {

    // Si todos los campos estan vacíos
    if (!dateOutcomeEl.value || !descriptionExpenseEl.value || !categoryExpenseEl.value || !priceExpenseEl.value) {

        messageBox.classList.add('show')
        messageBox.classList.add('hide')
    }

    setTimeout(function(){
        messageBox.classList.remove('show')
        messageBox.classList.remove('hide')
      }, 6000)
    

    // if just date is empty
    if (!dateOutcomeEl.value) {
        dateOutcomeEl.classList.add('error-field')
        
        setTimeout(function(){
          dateOutcomeEl.classList.remove('error-field')
        }, 3000)
    }
    
    // if just category is empty
    if (!descriptionExpenseEl.value) {
        descriptionExpenseEl.classList.add('error-field')
        setTimeout(function(){
          descriptionExpenseEl.classList.remove('error-field')
        }, 3000)
    }

    // if just category is empty
    if (!categoryExpenseEl.value) {
        categoryExpenseEl.classList.add('error-field')
        
        setTimeout(function(){
            categoryExpenseEl.classList.remove('error-field')
        }, 3000)
    } 
      
    // if just price is empty
      if (!priceExpenseEl.value) {
          priceExpenseEl.classList.add('error-field')
    
        setTimeout(function(){
          priceExpenseEl.classList.remove('error-field')
        }, 3000)
      }

      return;
}
