// Variables
var currentApiURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=d91f911bcf2c0f925fb6535547a5ddc9&q=";
var onecallAprilURL =
  "https://api.openweathermap.org/data/2.5/onecall?appid=d91f911bcf2c0f925fb6535547a5ddc9&";
var searchHistory = [];

var historyContainer = document.getElementById("history");
var formEl = document.getElementById("weather-form");
var historyContainer = document.getElementsByClassName("history");

// listen to the submit event on form
formEl.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  // read value from input
  var inputCity = document.getElementById("weather-search").value;

  fetch(currentApiURL + inputCity)
    .then(processStream)
    .then(getCoords)
    .then(getWeather)
    .then(processStream)
    .then(renderCurrentWeather)
    .catch(console.log);

  fetch(currentApiURL + inputCity)
    .then(processStream)
    .then(getCoords)
    .then(getWeather)
    .then(processStream)
    .then(renderFiveDaysForecast)
    .then(function (data) {
      if (data !== data) {
        alert("The input is not a city, or city is not found");
      } else {
        appendToHistory(inputCity);
      }
    })
    .catch(console.log);
}

function renderCurrentWeather(data) {
  var date = moment().format("M/D/YYYY");
  var city = document.getElementById("weather-search").value;
  var tempreture = ((9 / 5) * (data.current.temp - 273) + 32).toFixed(2);
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;
  var uvi = data.current.uvi;
  var iconPath = data.current.weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"

  document.getElementById("humidity").textContent = "Humidity: " + humidity;
  document.getElementById("tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("wind-speed").textContent =
    "Wind Speed: " + windSpeed;
  document.getElementById("uvi").textContent = "UV Index: " + uvi;
  document.getElementById("today").textContent = date;
  document.getElementById("city").textContent = city;
  $('#today-icon').attr('src', iconURL);
}

function renderFiveDaysForecast(data) {
  var firstDay = moment().add(1, "day").startOf("day").format("M/D/YYYY");
  var dataArray = data.daily;
  var tempretureKelvin = dataArray[0].temp.day;
  var humidity = dataArray[0].humidity;
  var iconPath = data.daily[0].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"
  document.getElementById("day-1").textContent = firstDay;
  var tempreture = ((9 / 5) * (tempretureKelvin - 273) + 32).toFixed(2);
  document.getElementById("day-1-tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("day-1-humidity").textContent =
    "Humidity: " + humidity;
    $('#day-1-icon').attr('src', iconURL)
  

  var secondDay = moment().add(2, "day").startOf("day").format("M/D/YYYY");
  var dataArray = data.daily;
  var tempretureKelvin = dataArray[1].temp.day;
  var humidity = dataArray[1].humidity;
  document.getElementById("day-2").textContent = secondDay;
  var tempreture = ((9 / 5) * (tempretureKelvin - 273) + 32).toFixed(2);
  var iconPath = data.daily[1].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"
  document.getElementById("day-2-tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("day-2-humidity").textContent =
    "Humidity: " + humidity;
    $('#day-2-icon').attr('src', iconURL)

  var thirdDay = moment().add(3, "day").startOf("day").format("M/D/YYYY");
  var dataArray = data.daily;
  var tempretureKelvin = dataArray[2].temp.day;
  var humidity = dataArray[2].humidity;
  document.getElementById("day-3").textContent = thirdDay;
  var tempreture = ((9 / 5) * (tempretureKelvin - 273) + 32).toFixed(2);
  var iconPath = data.daily[2].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"
  document.getElementById("day-3-tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("day-3-humidity").textContent =
    "Humidity: " + humidity;
  $('#day-3-icon').attr('src', iconURL)

  var fourthDay = moment().add(4, "day").startOf("day").format("M/D/YYYY");
  var dataArray = data.daily;
  var tempretureKelvin = dataArray[3].temp.day;
  var humidity = dataArray[3].humidity;
  document.getElementById("day-4").textContent = fourthDay;
  var tempreture = ((9 / 5) * (tempretureKelvin - 273) + 32).toFixed(2);
  var iconPath = data.daily[3].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"
  document.getElementById("day-4-tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("day-4-humidity").textContent =
    "Humidity: " + humidity;
  $('#day-4-icon').attr('src', iconURL);

  var fifthDay = moment().add(5, "day").startOf("day").format("M/D/YYYY");
  var dataArray = data.daily;
  var tempretureKelvin = dataArray[4].temp.day;
  var humidity = dataArray[4].humidity;
  document.getElementById("day-5").textContent = fifthDay;
  var tempreture = ((9 / 5) * (tempretureKelvin - 273) + 32).toFixed(2);
  var iconPath = data.daily[4].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconPath + ".png"
  document.getElementById("day-5-tempreture").textContent =
    "Tempreture: " + tempreture;
  document.getElementById("day-5-humidity").textContent =
    "Humidity: " + humidity;
    $('#day-5-icon').attr('src', iconURL);
}
function getWeather(urlsParams) {
  return fetch(onecallAprilURL + urlsParams);
}

function processStream(response) {
  return response.json();
}

function getCoords({ coord }) {
  var { lat, lon } = coord;
  var urlsParams = "lat=" + lat + "&lon=" + lon;
  return urlsParams;
}

// Show the search history
function renderSearchHistory() {
  historyContainer.innerHTML = "";
  // Show most recent searches at the top of the list.
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute("type", "button");
    btn.classList.add("history-btn", "btn-history");

    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    historyContainer.append(btn);
  }
}

function appendToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  renderSearchHistory();
}

function initSearchHistory() {
  var searchHistory = searchHistory[0];
  JSON.parse(window.localStorage.getItem(searchHistory));
  console.log(searchHistory);
  renderSearchHistory();
}

initSearchHistory();
searchHistory