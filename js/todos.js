const toDoList = document.querySelector(".js-toDoList"),
    toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input");

let toDos = [];

const TODOS_LS = 'toDos';
let count = 0;

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delButton = document.createElement("button");
    
    span.innerText = text;
    delButton.innerText = "X";
    delButton.classList.add("btn");
    delButton.addEventListener("click", delButtonClickHandler);
    li.appendChild(delButton);
    li.appendChild(span);
    li.id = count;
    const toDoObj = {
        id : count++,
        text
    };
    toDos.push(toDoObj);
    toDoList.appendChild(li);
    saveToDos();
}

function delButtonClickHandler(event){
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);
    const updatedToDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    toDos = updatedToDos;
    saveToDos();
}

function submitHandler(event){
    event.preventDefault();
    const currentToDo = toDoInput.value;
    if(currentToDo !== ''){
        toDoInput.value = '';
        paintToDo(currentToDo);
    }
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        });
    }else{
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", submitHandler);
}

init();