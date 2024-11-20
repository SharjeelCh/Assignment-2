// Initialize lists from local storage
var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
var comdoList = [];
var remList = [];

// DOM elements
var addButton = document.getElementById("add-button");
var todoTitleInput = document.getElementById("todo-title");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Event listeners
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

document.addEventListener("click", (e) => {
 let target = e.target;

 if (target.tagName === "SPAN") {
  target = target.parentElement;
 }

 if (target.className.split(" ")[0] === "complete" || target.className.split(" ")[0] === "ci") {
  completeTodo({ target });
 }

 if (target.className.split(" ")[0] === "delete" || target.className.split(" ")[0] === "di") {
  deleteTodo({ target });
 }

 if (target.id === "all") {
  viewAll();
 }

 if (target.id === "rem") {
  viewRemaining();
 }

 if (target.id === "com") {
  viewCompleted();
 }
});

todoInput.addEventListener("keypress", (e) => {
 if (e.key === "Enter") {
  add();
 }
});
todoTitleInput.addEventListener("keypress", (e) => {
 if (e.key === "Enter") {
  add();
 }
});

// Save tasks to local storage
function saveToLocalStorage() {
 localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Updates the completed and remaining lists
function update() {
 comdoList = todoList.filter((ele) => ele.complete);
 remList = todoList.filter((ele) => !ele.complete);

 document.getElementById("r-count").innerText = remList.length.toString();
 document.getElementById("c-count").innerText = comdoList.length.toString();

 saveToLocalStorage();
}

// Adds a new task
function add() {
 var title = todoTitleInput.value.trim();
 var value = todoInput.value.trim();

 if (title === "" || value === "") {
  alert("😮 Both title and task cannot be empty");
  return;
 }

 todoList.push({
  title: title,
  task: value,
  id: Date.now().toString(),
  complete: false,
 });

 todoTitleInput.value = "";
 todoInput.value = "";
 update();
 addinmain(todoList);
}

// Renders the todos list
function addinmain(todoList) {
 allTodos.innerHTML = "";
 todoList.forEach((element) => {
  var x = `<li id=${element.id} class="todo-item">
                <p class="todo-title">${element.complete? `<strike>${element.title}</strike>`:element.title}</p>
                <p class="todo-description">${element.complete ? `<strike>${element.task}</strike>` : element.task}</p>
                <div class="todo-actions">
                    <button class="complete btn btn-success">
                        <span style="font-size: 1.3rem;">🗸</span>
                    </button>
                    <button class="delete btn btn-error">
                        <span style="font-size: 0.85rem;">❌</span>
                    </button>
                </div>
            </li>`;
  allTodos.innerHTML += x;
 });
}

// Deletes a single task
function deleteTodo(e) {
 var deleted = e.target.parentElement.parentElement.getAttribute("id");
 todoList = todoList.filter((ele) => ele.id != deleted);

 update();
 addinmain(todoList);
}

// Marks a task as complete/incomplete
function completeTodo(e) {
 var completed = e.target.parentElement.parentElement.getAttribute("id");
 todoList.forEach((obj) => {
  if (obj.id == completed) {
   obj.complete = !obj.complete;
  }
 });

 update();
 addinmain(todoList);
}

// Deletes all tasks
function deleteAll() {
 todoList = [];
 update();
 addinmain(todoList);
}

// Deletes only completed tasks
function deleteS() {
 todoList = todoList.filter((ele) => !ele.complete);
 update();
 addinmain(todoList);
}

// Filter functions
function viewCompleted() {
 addinmain(comdoList);
}
function viewRemaining() {
 addinmain(remList);
}
function viewAll() {
 addinmain(todoList);
}

// Initial render on page load
document.addEventListener("DOMContentLoaded", () => {
 update();
 addinmain(todoList);
});
