//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event){
    // Prevent from submiting
    event.preventDefault();
    // Create div 
    if (todoInput.value==""){
        todoInput.style.border = '1px solid red';
    }
    else {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create list element 
        const todoListItem = document.createElement("li");
        todoListItem.innerText = todoInput.value;
        todoListItem.classList.add("todo-item");
        todoDiv.appendChild(todoListItem);
        // Save todo
        save(todoInput.value);  
        // Create check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class = "fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);

        todoInput.value = "";
        todoInput.style.border = 'none';
    }
}

function deleteOrCheck(event){
    const item = event.target;
    if (item.classList[0]==='delete-btn'){
        const todo = item.parentElement;
        todo.classList.add("fade");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    if (item.classList[0]==='check-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                     todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
               }
               else {
                   todo.style.display = 'none';
               }
               break;
        }
    });
}

function save(todo){
    let todos;
    if (localStorage.getItem('todos')===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos')===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create list element 
        const todoListItem = document.createElement("li");
        todoListItem.innerText = todo;
        todoListItem.classList.add("todo-item");
        todoDiv.appendChild(todoListItem);  
        // Create check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class = "fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos')===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}