

let allBalances = [];
let allmonths = [january2023, febuary2023]



getAllBalances(january2023);
getAllBalances(febuary2023);
getAllBalances(march2023);
getAllBalances(december2022);
function getAllBalances (allMonths) {
  let monthPrices = [];
    for (let i = 0; i < allMonths.length; i++) {
      monthPrices.push(allMonths[i].price);
      // console.log(allMonths[m][i].price);
      // console.log(monthPrices);
    }
    console.log({allMonths: allMonths});
    if (allMonths === 0) {  
      allBalances.push(allMonths)
      return;
    } else {
      function sum(accumulator, currentValue) {      
        return accumulator + currentValue;
      }
      const monthBalance = monthPrices.reduce(sum);
      allBalances.push(monthBalance)
  
    console.log(allBalances);
    return allBalances;
    } 
  }

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

