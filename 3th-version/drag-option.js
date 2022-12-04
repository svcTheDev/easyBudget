let rowLength = 0;
let indexArrayGrab = 0;
document.querySelectorAll("tbody tr").forEach((tr) => {
  tr.setAttribute("draggable", "true");
  tr.classList.add("draggable");
  rowLength++;
  tr.addEventListener("dragstart", function () {
    tr.classList.add("dragging");

    currentDateToDrag = getCurrentDate();
    console.log(currentDateToDrag);

    let rowIdStart = parseFloat(tr.firstElementChild.id.slice(-13));
    indexArrayGrab = currentDateToDrag.findIndex(
      (index) => index.id === rowIdStart
    );
  });

  tr.addEventListener("dragend", function () {
    tr.classList.remove("dragging");
    let indexTr = rowLength;
    document.querySelectorAll("tbody tr").forEach((newTr) => {
      indexTr--;
      newTr.setAttribute("id", indexTr);
    });
    let rowIdEnd = parseFloat(tr.firstElementChild.id.slice(-13));

    let rowObj = currentDateToDrag.find((obj) => obj.id === rowIdEnd);
    let indexRow = parseFloat(tr.id);

    if (indexRow === 0 || indexArrayGrab > indexRow) {
      indexRow;
    } else {
      indexRow = parseFloat(tr.id) + 1;
    }

    insertDragRow(currentDateToDrag, indexRow, rowObj);
    // insertDragRow(currentDateToDrag, indexRow, rowObj);

    let newBudget = JSON.stringify(currentDateToDrag);
    currentDateToDrag = JSON.parse(newBudget);
    // let newMonthBudget = JSON.stringify(currentDateToDrag);
    // currentDateToDrag = JSON.parse(newMonthBudget);
    console.log(currentDateToDrag);
    if (indexArrayGrab === 0 || indexArrayGrab < indexRow) {
      console.log("uno");
      currentDateToDrag.splice(parseFloat(indexArrayGrab), 1);
    //   currentDateToDrag.splice(parseFloat(indexArrayGrab), 1);
    } else {
      console.log("dos");
      currentDateToDrag.splice(parseFloat(indexArrayGrab + 1), 1);
    //   currentDateToDrag.splice(parseFloat(indexArrayGrab + 1), 1);
    }
    console.log(allBudgetStorage);
    console.log(currentDateToDrag);

    let indexDateList = monthIndex.findIndex(
      (monthIndex) => monthIndex === monthList.value
      );
  if (indexDateList == 12) {
      december2022 = currentDateToDrag;
    } else if (indexDateList == 1) {
      january2023 = currentDateToDrag;
    } else if (indexDateList = 2) {
      febuary2023 = currentDateToDrag;
    }
    newAllBudgetStorage = [...december2022, ...january2023, ...febuary2023]
    allBudgetStorage = newAllBudgetStorage;
    console.log(allBudgetStorage);
    sincronizeStorage();
    sincronizeDecember2022(); 
    sincronizeJanuary2023();
    sincronizeFebuary2023();
  });
});

function insertDragRow(allBudgetStorage, index, ...elementsArray) {
  allBudgetStorage.splice(index, 0, ...elementsArray);
}

table.addEventListener("dragover", setRowsToDrag);

function setRowsToDrag(e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(table, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    table.appendChild(draggable);
  } else {
    table.insertBefore(draggable, afterElement);
  }
}

function getDragAfterElement(table, y) {
  const draggableElements = [
    ...table.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
