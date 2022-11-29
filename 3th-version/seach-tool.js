searchBar.focus({ focusVisible: true });

function setSearch (currentBudget) {
  console.log('active0');
  searchBar.addEventListener("keyup", function (e){
    e.preventDefault();
    searchTool(currentBudget)
  })
}

function searchTool (currentBudget) {
  if (!searchBar.value) {
    return;
  }
  console.log(currentBudget);
  let valueSearch = searchBar.value;

  let dataToReturn = searchTable(valueSearch, currentBudget);
  showTableEntries(dataToReturn);
  console.log(dataToReturn);
  // showFilterTotal(dataToReturn);
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
        filterData.push(data);
      } else if (priceString.includes(valueSearch)) {
        /* just by writing any number */
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
  searchBar.onkeydown = function (e) {
    if (e.keyCode === 8) {
      if (searchBar.value.length <= 1) {
        location.reload();
      } else {
        return;
      }
    }
  };
};