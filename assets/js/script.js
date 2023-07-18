var countriesListEl = document.getElementById("countries")
var userInputEl = document.getElementById("user-selection") 

var countryNameArray = []

var apiKey = '6ca5adca9d894c52b90506cf4e32af81'
var countryObjectArray = []

fetch ("https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2")
.then(function(response) {
    return response.json()
})
.then(function(countryDataArray) {
    countryObjectArray =countryDataArray
    for ( var i = 0; i < countryDataArray.length; i++) {
        
        var countryName = countryDataArray[i].name.common
        // console.log(countryName)
        countryNameArray[i] = countryName
        var dropdownListItems = document.createElement("option")
        // dropdownListItems.text = countryNameArray[i]
        dropdownListItems.value = countryNameArray[i]
        countriesListEl.appendChild(dropdownListItems)
        }
    
})

var buttonClick = document.querySelector('button')
buttonClick.addEventListener('click', function(event){
    console.log(countriesListEl.value)
    event.preventDefault()
    console.log(userInputEl.value)
    for (var i =0; i < countryObjectArray.length; i++) {
        if(countryObjectArray[i].name == userInputEl.value) {
            return countryObjectArray[i].cca2
        } 
    }
    // var countryIndex = countryObjectArray.findIndex(userInputEl.value)
    
    console.log(countryIndex)
    
    var countryCode = countryObjectArray[countryIndex].cca2
    console.log(countryCode)
})

// }
// )


var proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='

function newsCall() {
    // fetch ('https://newsapi.org/v2/top-headlines?country=us' + '&' + apiKey)
    fetch (proxyUrl + encodeURIComponent('https://newsapi.org/v2/top-headlines?country=us&apiKey=6ca5adca9d894c52b90506cf4e32af81'))
    .then(function(response) {
    return response.json()
 }) .then(function(value) {
    console.log(value)
 })
}

newsCall()
// 

// console.log(countryDataArray)

// var codes = countryDataArray.code

// console.log(countryObjectArray)

// countriesListEl.value = 
// var searchUrl = 'https://restcountries.com/v3.1/independent?name=' + listCountry+ '&fields=cca2'

// https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2

// 
// 
// 