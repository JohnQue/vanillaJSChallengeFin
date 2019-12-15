const weather = document.querySelector('.js-weather');
let lon, lat;
const appid = '59f4bd23fcf43a0f883bdebcbbd922f5';
const COORDS = 'coords';
function success(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const coordsObj = {
        lat,
        lon
    };
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    getTemperature();
}

function getTemperature(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`)
    .then(response => response.json())
    .then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}/${place}`;
    });
}

function failed(){
    console.error("can't find geo info!");
}
function init(){
    const coords = localStorage.getItem(COORDS);
    if(coords !== null){
        const parsedCoords = JSON.parse(coords);
        lat = parsedCoords.lat;
        lon = parsedCoords.lon;
        getTemperature();
    }else{
        navigator.geolocation.getCurrentPosition(success, failed);
    }
}

init();
