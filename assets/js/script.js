var countriesListEl = document.getElementById("countries")

var countryNameArray = []

var apiKey = '9cc304d5d23f4ba185e1870cfce21094'
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
    event.preventDefault()
    console.log(countryObjectArray)

    var countryIndex = countryObjectArray.indexOf(countriesListEl.value)
    
    
    console.log(countryIndex)
    
    var countryCode = countryObjectArray[countryIndex].cca2
    console.log(countryCode)
})

// }
// )

// function restfulCountries() {

//     fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2")
// }
// var searchCountry = countriesListEl.value
// fetch( 'https://restcountries.com/v3.1/independent?name=' + searchCountry+ '&fields=cca2')

// console.log(countryDataArray)

// var codes = countryDataArray.code

// console.log(countryObjectArray)

// countriesListEl.value = 
// var searchUrl = 'https://restcountries.com/v3.1/independent?name=' + listCountry+ '&fields=cca2'

// https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2

// fetch ('https://newsapi.org/v2/top-headlines?country=' + '&' apiKey
// 
// 



function newsCall() {
    // fetch ('https://newsapi.org/v2/top-headlines?country=us' + '&' + apiKey)
    fetch ('https://newsapi.org/v2/top-headlines?country=us&apiKey=9cc304d5d23f4ba185e1870cfce21094')
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