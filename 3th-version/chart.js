

let allBalances = [];
let allmonths = [january2023, febuary2023, march2023, december2022]

for (let f = 0; f < allmonths.length; f++) {
    getAllBalances(allmonths[f])
  
}
function getAllBalances (allMonths) {
  let monthPrices = [];
    for (let i = 0; i < allMonths.length; i++) {
      monthPrices.push(allMonths[i].price);
    }

    if (allMonths === 0) {  
      // Agrega el balance vacío
      allBalances.push(allMonths)
      return;
    } else {
      // Suma nuevo balance
      function sum(accumulator, currentValue) {      
        return accumulator + currentValue;
      }
      const monthBalance = monthPrices.reduce(sum);
      allBalances.push(monthBalance)
  
    console.log(allBalances);
    return allBalances;
    } 
  }

  function sumYearBalances(accumulator, currentValue) {      
    return accumulator + currentValue;
  }

  const yearBalances = allBalances.reduce(sumYearBalances)
  balanceTotal.textContent = yearBalances + ' COP';

const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Año 2023',
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

