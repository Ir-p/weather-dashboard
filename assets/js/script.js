var inputCity = "new%20york"
var apiURL = "http://api.openweathermap.org/data/2.5/weather?appid=d91f911bcf2c0f925fb6535547a5ddc9&q="
var cityInputEl = document.getElementById("weather-search")
var formEl = document.getElementById("weather-form")
// listen to the submit event on form
formEl.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault()
    // read value from input 
    console.log(cityInputEl.value)
    // make ajax call to the weather API
    fetch(apiURL + inputCity)
        .then(processStream)
        .then(logCityWeather)
}

function processStream (response){
    return response.json()
}

function logCityWeather(data){
    console.log(data)
}