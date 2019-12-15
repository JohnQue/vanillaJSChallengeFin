const clock = document.querySelector(".js-clock");

function getCurrentTime(){
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    clock.innerHTML = `
        ${hours < 10?  `0${hours}`: hours}:${
        minutes < 10? `0${minutes}`: minutes}:${
        seconds < 10? `0${seconds}`: seconds}
    `;
}

function init(){
    setInterval(getCurrentTime, 1000);
}

init();