const greetings = document.querySelector(".js-greetings"),
    form = document.querySelector(".js-form"),
    input = form.querySelector("input");

const SHOWING = "showing", USERNAME = "username";

function displayName(text){
    const span = document.createElement("span");
    const button = document.createElement("button");
    span.innerHTML = `Hello ${text}`;
    button.innerHTML = "❌";
    button.classList.add("btn");
    button.addEventListener("click", buttonClickHandler);
    greetings.appendChild(span);
    greetings.appendChild(button);
}

function getName(){
    const userName = localStorage.getItem(USERNAME);
 
    if(userName === null){
        form.classList.add(SHOWING);        
    }else{
        greetings.classList.add(SHOWING);
        displayName(userName);
    }
}

function buttonClickHandler(event){
    localStorage.removeItem(USERNAME);
    greetings.classList.remove(SHOWING);
    form.classList.add(SHOWING);
    const btn = event.target;
    const div = btn.parentNode;
    const span = div.querySelector('span');
    greetings.removeChild(span);
    greetings.removeChild(btn);
}

function submitHandler(event){
    event.preventDefault();
    const currentValue = input.value;
    if(currentValue.replace(/^\s*/, "") !== ''){
        localStorage.setItem(USERNAME, currentValue);
        form.classList.remove(SHOWING);
        greetings.classList.add(SHOWING);
        displayName(currentValue);
        input.value = "";
    }
}

function init(){
    getName();
    form.addEventListener("submit", submitHandler);
}

init();