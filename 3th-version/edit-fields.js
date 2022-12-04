document.querySelectorAll(".fa-pencil").forEach((pencil) => {
    pencil.addEventListener("click", convertToInput);
});

//   document.querySelectorAll(".edit-field").forEach((rows) => {
    //     rows.addEventListener("click", getCloneRow);
    //   });
    
    // document.querySelectorAll(".specialDate").forEach((dates) => {
    //     dates.addEventListener("click", setNewDate);
    // });
    
  //   function setNewDate(e) {
  //       console.log('1');
  //       let iconDateParent = this.parentElement;
        
  //   if (iconDateParent.hasAttribute("data-clicked")) {
  //     return;
  //   }
  //   iconDateParent.setAttribute("data-clicked", "yes");
  //   iconDateParent.setAttribute("data-text", iconDateParent.textContent);
  //   let inputDate = document.createElement("input");
  //   inputDate.setAttribute("type", "date");
  //   inputDate.value = iconDateParent.textContent;
  //   inputDate.classList.add("onEdit");
  //   this.classList.remove("size");
  //   // console.log(iconDateParent.textContent);
  
  //   inputDate.onblur = function (e) {
      
  //     let dateTd = inputDate.parentElement;
  //     let original_date = inputDate.parentElement.getAttribute("data-text");
  //     let current_date = iconDateParent.textContent;
  //     let dateParentId = parseFloat(e.target.parentElement.id.slice(-13));
        
  //     if (current_date !== original_date) {
  //       console.log(1);
  //       dateTd.removeAttribute("data-clicked");
  //       dateTd.removeAttribute("data-text");
  //       dateTd.innerHTML = current_date + `<i class="fa-solid fa-pencil">`;
  
  //       const checkDateId = december2022.find(
  //         (values) => values.id === dateParentId
  //       );
  //       delete checkDateId.date;
  //       checkDateId.date = current_date;
  //       showTableEntries(december2022);
  //       sincronizeDecember2022();
  
  //       console.log(original_date + " is changed to " + current_date);
  //       // location.reload();
  //     } else {
  //       console.log(2);
  //       dateTd.removeAttribute("data-clicked");
  //       dateTd.removeAttribute("data-text");
  //       dateTd.innerHTML = original_date + `<i class="fa-solid fa-pencil">`;
  //       iconDateParent.classList.add("size");
  //     }
  //   };
  //   inputDate.onkeypress = function () {
  //     if (event.keyCode === 13) {
  //       this.blur();
  //       // location.reload();
  //     }
  //   };
  //   iconDateParent.innerHTML = "";
  //   iconDateParent.append(inputDate);
  //   iconDateParent.firstElementChild.select();
  // }
  
  /* takes all but date fields */
  function convertToInput(e) {
    let iconParent = this.parentElement;
  
    if (this.className.includes("specialDate")) {
      return;
    }
  
    if (iconParent.hasAttribute("data-clicked")) {
      return;
    }
    iconParent.setAttribute("data-clicked", "yes");
    iconParent.setAttribute("data-text", iconParent.textContent);
  
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = iconParent.textContent;
    input.classList.add("onEdit");
    iconParent.classList.remove("size");
    console.log(input.value);

    input.onblur = function (e) {
      iconParent.classList.add("size");
      let td = input.parentElement;
      console.log(input.parentElement);
      let original_text = input.parentElement.getAttribute("data-text");
      let current_text = this.value;
      let savedParentId = parseFloat(e.target.parentElement.id.slice(-13));
      let savedParentType = e.target.parentElement.id.slice("", -20);
  
      if (original_text !== current_text) {
        td.removeAttribute("data-clicked");
        td.removeAttribute("data-text");
        td.innerHTML = current_text + `<i class="fa-solid fa-pencil">`;
  
        currentDate = getCurrentDate();

        const checkId = currentDate.find(
          (values) => values.id === savedParentId
        );


        if (savedParentType === "description") {
          if (current_text.length > 50 || current_text.length === 0) {
            td.removeAttribute("data-clicked");
            td.removeAttribute("data-text");
            td.innerHTML = original_text;
            return;
          }
          delete checkId.description;
          checkId.description = current_text;
          sincronizeDecember2022();
          sincronizeJanuary2023();
          sincronizeFebuary2023();
          
        }
  
        if (savedParentType === "category") {
          if (current_text.length > 20 || current_text.length === 0) {
            td.removeAttribute("data-clicked");
            td.removeAttribute("data-text");
            td.innerHTML = original_text;
            return;
          }
          delete checkId.category;
          checkId.category = current_text;
          sincronizeDecember2022();
          sincronizeJanuary2023();
          sincronizeFebuary2023();
          
        }
        if (savedParentType === "price") {
          if (current_text.length > 9 || current_text.length === 0) {
            td.removeAttribute("data-clicked");
            td.removeAttribute("data-text");
            td.innerHTML = original_text;
            return;
          }
          delete checkId.price;
          checkId.price = parseFloat(current_text);
          sincronizeDecember2022();
          sincronizeJanuary2023();
          sincronizeFebuary2023();
          
        }
        location.reload();
    } else {
          console.log('hola?');
        td.removeAttribute("data-clicked");
        td.removeAttribute("data-text");
        td.innerHTML = original_text + `<i class="fa-solid fa-pencil">`;
        location.reload();
      }
    };
  
    input.onkeypress = function () {
      if (event.keyCode === 13) {
        this.blur();
        location.reload();
      }
    };
    input.onkeydown = function (e) {
      if (e.keyCode === 9) {
        // location.reload();{
      }
    };
    iconParent.innerHTML = "";
    iconParent.append(input);
    iconParent.firstElementChild.select();
  }