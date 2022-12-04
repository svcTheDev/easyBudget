document.querySelectorAll(".duplicate-icon").forEach((icons) => {
    icons.addEventListener("click", getCloneRow);
  });
  
    function getCloneRow(e) {
    if (!e.target.className.includes("duplicate-icon")) {
      return;
    }

    currentDateToClone = getCurrentDate();
   
    /* To specific months */
   
      
      let rowId = parseFloat(this.parentElement.id.slice(-13));
      let indexMonthRow = currentDateToClone.findIndex((values) => values.id === rowId);
      
      let rowMonthById = currentDateToClone.find((values) => values.id === rowId);
      
      let stringMonthRow = JSON.stringify(rowMonthById);
      let cloneMonthRow = JSON.parse(stringMonthRow);
      
      delete cloneMonthRow.id;
      cloneMonthRow.id = Date.now();
      insertCloneRow(currentDateToClone, indexMonthRow, cloneMonthRow);
      console.log(currentDateToClone);
      
      let indexDateList = monthIndex.findIndex(
        (monthIndex) => monthIndex === monthList.value
        );
    if (indexDateList == 12) {
        december2022 = currentDateToClone;
      } else if (indexDateList == 1) {
        january2023 = currentDateToClone;
      } else if (indexDateList = 2) {
        febuary2023 = currentDateToClone;
      }
  

      showTableEntries(currentDateToClone);
      sincronizeDecember2022();
      sincronizeJanuary2023();
      sincronizeFebuary2023();
 
   /* To the whole budget */

   const indexRow = allBudgetStorage.findIndex((values) => values.id === rowId);

   const rowById = allBudgetStorage.find((values) => values.id === rowId);
 
   let stringRow = JSON.stringify(rowById);
   let cloneRow = JSON.parse(stringRow);
 
   delete cloneRow.id;
   cloneRow.id = Date.now();
   insertCloneRow(allBudgetStorage, indexRow, cloneRow);
   sincronizeStorage();

    location.reload();
  }
  
  function insertCloneRow(allBudgetStorage, index, ...elementsArray) {
    allBudgetStorage.splice(index, 0, ...elementsArray);
  }
  


