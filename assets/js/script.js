var countriesListEl = document.getElementById("countries")
var userInputEl = document.getElementById("user-selection") 
var countryCode = ""
var countryNameArray = []
var apiKey = '6ca5adca9d894c52b90506cf4e32af81'
var countryObjectArray = []
var capitalEl = document.getElementById("capital-display")
var languageEl = document.getElementById("language-display")
var populationEL = document.getElementById("population-display")
var regionEl = document.getElementById("region-display")
var flagEL = document.getElementById("country-flag")
var searchHistoryEl = document.getElementById("search-history")
var validNewsCountry = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za']

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

var proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='

function newsCall(countryCode) {
    fetch (proxyUrl + encodeURIComponent('https://newsapi.org/v2/top-headlines?country='+ countryCode + '&apiKey=' + apiKey))
    .then(function(response) {
    return response.json()
 }) .then(function(value) {
    console.log(value)
 })
}

var buttonClick = document.querySelector('button')
buttonClick.addEventListener('click', function(event){
    event.preventDefault()
    console.log(userInputEl.value)
    countryCode = ""
    for (var i =0; i < countryObjectArray.length; i++) {
        if(countryObjectArray[i].name.common == userInputEl.value) {
            console.log(countryObjectArray[i])
            console.log(countryObjectArray[i].cca2)
            countryCode = countryObjectArray[i].cca2.toLowerCase()
        } 
    }
    newsCall(countryCode)

})


