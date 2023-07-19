var countriesListEl = document.getElementById("countries")
var userInputEl = document.getElementById("user-selection") 
var countryNameArray = []
var apiKey = '6ca5adca9d894c52b90506cf4e32af81'
var countryObjectArray = []
var capitalEl = document.getElementById("capital-display")
var languageEl = document.getElementById("language-display")
var populationEL = document.getElementById("population-display")
var regionEl = document.getElementById("region-display")
var flagEL = document.getElementById("country-flag")
var searchHistoryEl = document.getElementById("search-history")
var countryNameEl= document.getElementById("country-name")
var validNewsCountries = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za']

fetch ("https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2,region,subregion,population")
.then(function(response) {
    return response.json()
})
.then(function(allCountryData) {
    // populates the dropdown menu
    for ( var i = 0; i < allCountryData.length; i++) {
        if (validNewsCountries.includes(allCountryData[i].cca2.toLowerCase() ) ) {
            var countryName = allCountryData[i].name.common
            // console.log(countryName)
            countryNameArray[i] = countryName
            var dropdownListItems = document.createElement("option")
            // dropdownListItems.text = countryNameArray[i]
            dropdownListItems.value = countryNameArray[i]
            countriesListEl.appendChild(dropdownListItems)
            countryObjectArray.push(allCountryData[i])
        }
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

var buttonClick = document.getElementById('search-btn')
buttonClick.addEventListener('click', function(event){
    event.preventDefault()
    console.log(userInputEl.value)
    var currentCountryObject = countryDataFinder(userInputEl.value)
    console.log(currentCountryObject)
    displayCountryInfo()
    if (!!currentCountryObject) {
        newsCall(currentCountryObject.cca2.toLowerCase())
    }

})

function countryDataFinder(countryName) {
    for (var i = 0; i < countryObjectArray.length; i++) {
        if(countryObjectArray[i].name.common == countryName) {
            return countryObjectArray[i]
        } 
    } 
    return null
}

function displayCountryInfo() {
    var currentCountryObject = countryDataFinder(userInputEl.value)
    populationEL.innerText= "The population is: "+currentCountryObject.population+ people
    regionEl.innerText= "The continent is: "+currentCountryObject.region
    languageEl.innerText= "The languages(s) used are: "+Object.values(currentCountryObject.languages).join(", ")
    capitalEl.innerText= "The Capital City is: "+currentCountryObject.capital[0]
    flagEL.src= "https://www.countryflagicons.com/FLAT/64/"+ currentCountryObject.cca2 +".png"
    countryNameEl.innerText= currentCountryObject.name.common
}

function displayNews(){
 
}