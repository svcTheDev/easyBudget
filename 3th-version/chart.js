let allBalances = [];
let allMandatory = [];
let allVoluntary = [];
let allSaving = [];
let allmonths = [january2023];


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
    
    let mandatoryType = sumMandatoryBalance(allMonths); 
    let voluntaryType = sumVoluntaryBalance(allMonths); 
    let savingType = sumSavingBalance(allMonths); 
    
    const monthMandatory = mandatoryType.reduce(sum);
    allMandatory.push(monthMandatory);
    const monthVoluntary = voluntaryType.reduce(sum);
    allVoluntary.push(monthVoluntary);
    const monthSaving = savingType.reduce(sum);
    allSaving.push(monthSaving);
  }
  console.log(allMandatory);
  console.log(allSaving);


}

function sumMandatoryBalance (allMonths) {
  const mandatoryPrices = allMonths.filter(
    (month) => month.typeList === "Obligatorio"
    );
  let mandatoryType = [];
  for (let i = 0; i < mandatoryPrices.length; i++) {
    mandatoryType.push(allMonths[i].price);
  }
  return mandatoryType;
}

function sumVoluntaryBalance (allMonths) {
  const voluntaryPrices = allMonths.filter(
    (month) => month.typeList === "Voluntario"
    );
    let voluntaryType = [];
    for (let i = 0; i < voluntaryPrices.length; i++) {
      voluntaryType.push(voluntaryPrices[i].price);
    }
  return voluntaryType;
}
function sumSavingBalance (allMonths) {
  const savingPrices = allMonths.filter(
    (month) => month.typeList === "Ahorro"
    );
    let savingType = [];
    for (let i = 0; i < savingPrices.length; i++) {
      savingType.push(savingPrices[i].price);
    }
  return savingType;
}



const yearBalances = allBalances.reduce(sum);
balanceTotal.textContent = yearBalances + " COP";
const mandatoryBalances = allMandatory.reduce(sum );
mandatoryTotal.textContent = mandatoryBalances + " COP";
const voluntaryBalances = allVoluntary.reduce(sum );
voluntaryTotal.textContent = voluntaryBalances + " COP";
const savingBalances = allSaving.reduce(sum );
savingTotal.textContent = savingBalances + " COP";


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
