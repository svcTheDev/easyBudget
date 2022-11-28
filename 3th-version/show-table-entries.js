let budgetID;
let currentBudgetToDelete;

function getDayWeek(date) {
    const days = {
      0: "Lunes",
      1: "Martes",
      2: "Miercoles",
      3: "Jueves",
      4: "Viernes",
      5: "Sábado",
      6: "Domingo",
    };
    return days[date.getDay()];
  }

function showTableEntries(budgetStorage) {
    console.log(budgetStorage);
    table.innerHTML = "";
    budgetStorage.forEach((budget) => {
      // const row = document.createElement("tr");
      let selectClass =
        budget.type === "income" ? "record-income" : "record-outcome";
  
      const row = `   
      <td id="date-field ${
        budget.id
      }" class="size edit-field"><i class='far fa-clone duplicate-icon'></i>    
      ${getDayWeek(new Date(budget.date))} ${
        budget.date
      }<i class="specialDate fa-solid fa-pencil"></i>
          <td id="description-field ${budget.id}" class="size edit-field">${
        budget.description
      }<i class="fa-solid fa-pencil"></i></td>
          <td id="category-field ${budget.id}" class="size edit-field">${
        budget.category
      }<i class="fa-solid fa-pencil"></i></td>
          <td id="price-field ${
            budget.id
          }" class="size edit-field ${selectClass}">${
        budget.price
      }<i class="fa-solid fa-pencil"></i></td>
          <td id="delete">Delete</td>
          `;
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("delete");
  
      table.insertAdjacentHTML("afterbegin", row);
  
      document.querySelector("#delete").onclick = () => {
        confirmation.focus({ focusVisible: true });
        document.onkeydown = function (e) {
          if (event.keyCode === 39) {
            cancelation.focus({ focusVisible: true });
          } else if (event.keyCode === 37) {
            confirmation.focus({ focusVisible: true });
          }
        };
  
        modalContainer.classList.add("show-confirmation");
        budgetID = budget.id;
        currentBudgetToDelete = budgetStorage;
      };
    });
  }

  modalContainer.addEventListener("click", discardModal);

function discardModal(e) {
  // console.log(e.target.className);
  if (e.target.className !== "modalP" && e.target.className !== "modal") {
    modalContainer.classList.add("modal-inactive");
    modalContainer.classList.remove("show-confirmation");
  } else {
    return;
  }
}

confirmation.addEventListener("click", function () {
  deleteRow(budgetID, currentBudgetToDelete);
  modalContainer.classList.add("modal-inactive");
  modalContainer.classList.remove("show-confirmation");
  // const audioDelete = new Audio("Audios/delete.mp3")
  // audioDelete.play();
});

cancelation.addEventListener("click", function () {
  modalContainer.classList.add("modal-inactive");
  modalContainer.classList.remove("show-confirmation");
});

function deleteRow(id, current) {
  console.log(current);
  console.log(december2022);

  if (JSON.stringify(current) === JSON.stringify(december2022)) {
    console.log(1);
    december2022 = december2022.filter((budget) => budget.id !== id);
    showTableEntries(december2022);
    setAllCalculations(december2022);
    sincronizeDecember2022();
  }
}