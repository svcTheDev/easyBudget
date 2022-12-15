let december2022;
let january2023;
let febuary2023;
let march2023 = [];
// let april2023 = [2000];
let lastDate;
let savedLastDate;

let uniqueMonths = [];
let uniqueYears = [];
// let allmonths = [december2022, january2023]
let originalPrices = []

allBudgetStorage = JSON.parse(localStorage.getItem("globalBudgetSaved")) || [];
december2022 = JSON.parse(localStorage.getItem("budgetDecember2022")) || [];
january2023 = JSON.parse(localStorage.getItem("budgetJanuary2023")) || [];
febuary2023 = JSON.parse(localStorage.getItem("budgetFebuary2023")) || [];
lastDate = JSON.parse(localStorage.getItem("lastDate")) || '';

console.log({december2022: december2022, january2023: january2023, febuary2023: febuary2023, all: allBudgetStorage, lastDate: lastDate});
