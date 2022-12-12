allBudgetStorage = JSON.parse(localStorage.getItem("globalBudgetSaved")) || [];
december2022 = JSON.parse(localStorage.getItem("budgetDecember2022")) || [];
january2023 = JSON.parse(localStorage.getItem("budgetJanuary2023")) || [];
febuary2023 = JSON.parse(localStorage.getItem("budgetFebuary2023")) || [];
lastDate = JSON.parse(localStorage.getItem("lastDate")) || '';

let allBalances = [];
let allmonths = [december2022, january2023]

getAllBalances(allmonths);
function getAllBalances (allMonths) {
  let monthPrices = [];
  for (let m = 0; m < allMonths.length; m++) {
    for (let i = 0; i < allMonths[m].length; i++) {
      monthPrices.push(allMonths[m][i].price);
    }
    
    function sum(accumulator, currentValue) {
      return accumulator + currentValue;
    }
    const monthBalance = monthPrices.reduce(sum);
    allBalances.push(monthBalance)
  }

  console.log(allBalances);
  return allBalances;
  }

const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Año 2022',
      data: [allBalances[0], allBalances[1], allBalances[2], allBalances[3], allBalances[4], allBalances[5], allBalances[6], allBalances[7], allBalances[8], allBalances[9], allBalances[10], allBalances[11]],
      borderWidth: 1,
      //   backgroundColor: 'blue'
    }]
  }, 
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

