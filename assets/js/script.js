var inputCity = "new york"
var currentApiURL = "http://api.openweathermap.org/data/2.5/weather?appid=d91f911bcf2c0f925fb6535547a5ddc9&q="
var onecallAprilURL = "http://api.openweathermap.org/data/2.5/onecall?appid=d91f911bcf2c0f925fb6535547a5ddc9&"
var cityInputEl = document.getElementById("weather-search")
var formEl = document.getElementById("weather-form")
// listen to the submit event on form
formEl.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault()
    // read value from input 
    console.log(cityInputEl.value)
    // make ajax call to the weather API
    
    fetch(currentApiURL + inputCity)
        .then(processStream)
        .then(getCoords)
        .then(getWeather)
        .then(processStream)
        .then(renderCards)
        .catch(console.log)

}
function renderCards(weatherData){
  console.log(weatherData)
}
function getWeather(urlsParams){
  return fetch(onecallAprilURL + urlsParams)

}

function processStream (response){
    return response.json()
}

function getCoords({coord}){
  var {lat, lon} = coord;
  var urlsParams = "lat=" + lat + "&lon=" + lon;
  return urlsParams;
}
function logCityWeather(data){
    // console.log(data)
    // console.log("tempreture", ((9/5)*(data.main.temp-273)+32).toFixed(2),"calvin", data.main.temp)
    // console.log("humidity", data.main.humidity)
    // console.log("wind speed", data.wind.speed)
    var tempreture = ((9/5)*(data.main.temp-273)+32).toFixed(2)
    var humidity = data.main.humidity
    var windSpeed = data.wind.speed
    document.getElementById('tempreture').textContent = "Tempreture: " + tempreture 
    document.getElementById('humidity').textContent = "Humidity: " + humidity 
    document.getElementById('wind-speed').textContent = "Wind Speed: " + windSpeed 


}