var cityInputEl = document.getElementById("weather-search")
var formEl = document.getElementById("weather-form")
// listen to the submit event on form
formEl.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault()
    // read value from input 
    console.log(cityInputEl.value)
    // make ajax call to the weather API
}