# Easy Budget Instructions 

### CSS

- Add a transition when creating a new entry X
- Sidebar ✅
- Diseño del home (Big chart, brieflty summary of incomes, expenses, mandatory expenses and voluntary expenses, goal chart)
- Manual de uso
- FAQ
- Historial 
- Planificador de gastos (gastos e ingresos que crees que tendrás en el futuro para momentos especificos)
- Adjust message for inexisiting date selected 
### JS
- Organize by month ✅
- Add audio ✅
- Recreate the app with a month array active ✅
- Make sharp the code app (reduce the way months are read individually into a function, )
- Sidebar: draggable calculator


--- Pending issues
- Update the month and year text of the list when a new date is added ✅
- Fix issues with month and list filter at the same time 


# History

### 06/11/2022

<!-- TODO --> - Organize by month ✅✅✅
<!-- TODO --> - Create a html list with months ✅
<!-- TODO --> - Get the value of month selected ✅

### 07/11/2022

<!-- TODO --> - Read the whole dates on the current budget array 
<!-- TODO --> - Create a month object ✅
<!-- TODO --> - Identify which months are in the current array ✅
<!-- TODO --> - Filter the array by index✅

### 08/11/2022

<!-- TODO --> - Add audio ✅✅✅
<!-- TODO --> - Download audios ✅
<!-- TODO --> - Use new audio and .play ✅

<!-- TODO --> --- Recreate the app with a month array active

<!-- TODO --> - Set the new folders 
<!-- TODO --> - Get the expenses and income entries of the user by month and year*/ ✅

### 09/11/2022
<!-- TODO --> - Updates the incomes, expenses, and balance automatically 

### 11/11/2022
<!-- TODO --> - Save all in the local storage 
<!-- TODO --> - create 3 differnt arrays to store them independently 

<!-- How should work the local storage by month -->
- 3 arrays by month on an specific year
- names are going to be january2023, december2022, febuary 2023 
- To create dinamically the arrays, we are going to store them in an object
- These arrays will be filled on every filter 

### 14/11/2022
<!-- TODO --> - create 3 differnt arrays to store them independently ✅

--- Pending issues
- Activate change of month and year ✅
- when I change the list and charge the page the list and the table do not match ✅
- 
- When is selected a date that does not exist e.x: enero 2022
- Set conditionals to all input entries 

### 15/11/2022 1:30h
--- Pending issues
- when I change the list and charge the page the list and the table do not match ✅

### 16/11/2022
--- Pending issues
- when refreshing the page without an existing date, the page missed all data ✅

### 27/11/2022
### JS
- End the rest of the repeated code
4 — Translates automatically the totals into words ✅
5 — Instant search tool of the entries on the table ✅


### 28/11/2022
### JS

6 — Sorts function on all the 4 categories ✅
7 — Deletes dynamically the rows by clicking the delete button ✅

### css
- Add a transition when creating a new entry
- Sidebar 

### 01/12/2022
8 - create edit fields option and fix bug with edit fields, but I had to delete the option to edit dates ✅

--- Pending issues
- Fix bug when adding a new entry, returns a delete item ✅
- Clones rows by clicking the clone icon ✅

### 02/12/2022 
9 - Drag rows ❌

### 03/12/2022
9 - Drag rows ✅
- Add the rest of the arrays to clone rows ✅

### 04/12/2022
- Some sorts are not working in some months ✅
- When editing a price is not being automatically updated on the totals ✅
- When user selects a non existing date unlike the table, the totals are updated ✅

### 05/12/2022
- Sidebar ✅

### 06/12/2022
- (falta arreglar los meses y años en el tamaño mediano de la página)  ✅
- (Falta centrar el summary) ✅
- (Falta agregar las opciones del sidebar en el menu hamburguesa y hacer que funcione el menu hamburguesa)✅
- Agregué option tipo en las entries ✅
- El boton enviar esta más pequeño a causa de una nueva categoria en mq 768 ✅

### css
- Add a transition when creating a new entry❌
- Sidebar ✅
- Diseño del home (Big chart, brieflty summary of incomes, expenses, mandatory expenses and voluntary expenses, goal chart)
- Adjust message for inexisiting date selected 
- Manual de uso
- FAQ
### JS
- Organize by month ✅
- Add audio ✅
- Recreate the app with a month array active ✅
- Sidebar: draggable calculator 

# 07/12/2022
- Desingning home section part 1 ✅

# 08/12/2022 
- Desingning home section part 2 (goal section missing(custome price slider), adjusting responsive) ✅ 2:00
- Fix font family
- Start to edit the different charts 

# 11/12/2022
- Fix font family whole page ✅

# 12/12/2022
Start to edit the different charts
- Create the all balances and print them on the chart ✅
- Create a localStorage folder apart ✅

# 13/12/2022
- Simulate whole months of 2023 in order to see it better (with an empty one)✅
- Adding voluntary expenses and mandatory expenses 
- Update the balances on the home page 

# 14/12/2022
- Adding voluntary expenses and mandatory expenses ✅
- Update chart function to receive saving, voluntary and mandatory ✅
- Update the balances on the home page ✅

# 16/12/2022
- Organize update totals on index html
- Fix bug when month does not have a specific type of expense on chart js
- Update the totals on the entry page 
- Create a function to read the chart selected 
- Arreglar todas las funciones de la app para el nuevo entry
- Update chart function to receive saving, voluntary and mandatory on the get Expenses function instead of the chart

--- Pending issues
- Update the month and year text of the list when a new date is added ✅
- Fix issues with month qand list filter at the same time ✅
- Sometimes change the month and creates an array that does not exist ✅
- When adding a new entry, the array does not save the arrange previously done by the user, you have to update the allbudget array at the same time ✅
- Some sorts are not working in some months ✅
- When editing a price is not being automatically updated on the totals ✅
- When user selects a non existing date unlike the table, the totals are updated ✅
- When deleting a complete month, one of the months with entries is deleted until the page is refreshed (sometimes) 
- There is an error with the location reload when cloning rows ✅
- Local storage not working (check local storage and totals on all functions) 
- Issues with mobile screen orientationq
