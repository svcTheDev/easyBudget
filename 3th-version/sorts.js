
function setSortTool (currentBudget) {
    console.log('0');
    priceColumnButton.addEventListener("click", function (e){
        e.preventDefault();
        sortByPrice(currentBudget)
      })
    categoryColumnButton.addEventListener("click", function (e){
        e.preventDefault();
        sortByCategory(currentBudget)
      })
    dateColumnButton.addEventListener("click", function (e){
        e.preventDefault();
        sortByDate(currentBudget)
      })
    descriptionColumnButton.addEventListener("click", function (e){
        e.preventDefault();
        sortByDescription(currentBudget)
      })
  }

let indexPrice = 0;
function sortByPrice(currentBudget) {
  if (searchBar.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexPrice === 0) {
      let sorted = currentBudget.sort((a, b) =>
        a.price > b.price ? 1 : a.price < b.price ? -1 : 0
      );
      priceColumnButton.classList.add("fa-caret-up");
      priceColumnButton.classList.remove("fa-sort");
      console.log(sorted);
      showTableEntries(sorted);
      indexPrice++;
    } else if (indexPrice === 1) {
      let sorted2 = currentBudget.sort((a, b) =>
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
function sortByCategory(currentBudget) {
  if (searchBar.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexCategory === 0) {
      categoryColumnButton.classList.add("fa-caret-up");
      categoryColumnButton.classList.remove("fa-sort");
      let sorted = currentBudget.sort((a, b) =>
        a.category > b.category ? 1 : a.category < b.category ? -1 : 0
      );
      console.log(sorted);
      showTableEntries(sorted);
      indexCategory++;
    } else if (indexCategory === 1) {
      categoryColumnButton.classList.add("fa-caret-down");
      categoryColumnButton.classList.remove("fa-caret-up");
      let sorted2 = currentBudget.sort((a, b) =>
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
function sortByDate(currentBudget) {
  if (searchBar.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexDate === 0) {
      dateColumnButton.classList.add("fa-caret-up");
      dateColumnButton.classList.remove("fa-sort");
      let sorted = currentBudget.sort((a, b) =>
        a.date > b.date ? 1 : a.date < b.date ? -1 : 0
      );
      console.log(sorted);
      showTableEntries(sorted);
      indexDate++;
    } else if (indexDate === 1) {
      dateColumnButton.classList.add("fa-caret-down");
      dateColumnButton.classList.remove("fa-caret-up");
      let sorted2 = currentBudget.sort((a, b) =>
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
function sortByDescription(currentBudget) {
  if (searchBar.value) {
    return;
  } else {
    console.log(originalPrices);
    if (indexDescription === 0) {
      descriptionColumnButton.classList.add("fa-caret-up");
      descriptionColumnButton.classList.remove("fa-sort");
      let sorted = currentBudget.sort((a, b) =>
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
      let sorted2 = currentBudget.sort((a, b) =>
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
