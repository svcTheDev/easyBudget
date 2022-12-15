let allBalances = [];
let allMandatory = [];
let allmonths = [january2023, febuary2023, march2023, december2022];


function sum(accumulator, currentValue) {
  return accumulator + currentValue;
}

for (let f = 0; f < allmonths.length; f++) {
  getAllBalances(allmonths[f]);
}
function getAllBalances(allMonths) {
  let monthPrices = [];
  for (let i = 0; i < allMonths.length; i++) {
    monthPrices.push(allMonths[i].price);
  }
  if (allMonths.length === 0) {
    // add empty balance
    allMandatory.push(allMonths);
    allBalances.push(allMonths);
    return;
  } else {
    // new balance to sum
    const monthBalance = monthPrices.reduce(sum);
    allBalances.push(monthBalance);

    // new mandatory to sum
    
    sumTypePrices(); 
    
    const monthMandatory = mandatoryType.reduce(sum);
    allMandatory.push(monthMandatory);
  }

}

function sumTypePrices () {
  const mandatoryPrices = allMonths.filter(
    (month) => month.typeList === "Obligatorio"
    );
    console.log(mandatoryPrices);
  let mandatoryType = [];
  for (let i = 0; i < mandatoryPrices.length; i++) {
    mandatoryType.push(allMonths[i].price);
  }
}

function sumYearBalances(accumulator, currentValue) {
  return accumulator + currentValue;
}
console.log(allMandatory);
const yearBalances = allBalances.reduce(sum);
balanceTotal.textContent = yearBalances + " COP";
const mandatoryBalances = allMandatory.reduce(sum );
expenseTotal.textContent = mandatoryBalances + " COP";

const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
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
    ],
    datasets: [
      {
        label: "Año 2023",
        data: [
          allBalances[0],
          allBalances[1],
          allBalances[2],
          allBalances[3],
          allBalances[4],
          allBalances[5],
          allBalances[6],
          allBalances[7],
          allBalances[8],
          allBalances[9],
          allBalances[10],
          allBalances[11],
        ],
        borderWidth: 1,
        //   backgroundColor: 'blue'
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
