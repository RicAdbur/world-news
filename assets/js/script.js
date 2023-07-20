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
// var articleArray = []
var validNewsCountries = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za']

var savedUserFavorites = getLocalStorage()
// variable to use for favorited countries, called with 

fetchRestAPI()// calls to REST API, creates country objects for all countries and sets country names in the search bar
getLocalStorage() //adds favorites to savedUserFavorites array

function fetchRestAPI() {
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
    
})}

var proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='

function newsCall(countryCode) {
    fetch (proxyUrl + encodeURIComponent('https://newsapi.org/v2/top-headlines?country='+ countryCode + '&apiKey=' + apiKey))
    .then(function(response) {
    return response.json()
 }) .then(function(value) {
    console.log(value)
    // articleArray = value.articles
    displayNews(value.articles)
 })
}  //completes call to news API and runs displayNews()

var searchButtonClick = document.getElementById('search-btn')

searchButtonClick.addEventListener('click', function(event){
    event.preventDefault()
    console.log(userInputEl.value)
    var currentCountryObject = countryDataFinder(userInputEl.value)
    console.log(currentCountryObject)
    //local storage code
    var userCountry = userInputEl.value//variable value must be set in the function to get the value correctly
    setLocalStorage(userCountry)
    //local storage code
    displayCountryInfo()
    if (!!currentCountryObject) {
        newsCall(currentCountryObject.cca2.toLowerCase())
        removeHidden()
    }
    

})

// favoriteButtonEl.addEventListener('click', saveFavorite())
//even listener for favorite buttons, TODO rename favoriteButtonEl variable

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
    var pop = currentCountryObject.population
    populationEL.innerText= "Population: "+ new Intl.NumberFormat().format(pop)
    regionEl.innerText= "Region: "+currentCountryObject.region
    languageEl.innerText= "Language(s): "+Object.values(currentCountryObject.languages).join(", ")
    capitalEl.innerText= "Capital: "+currentCountryObject.capital[0]
    flagEL.src= "https://www.countryflagicons.com/FLAT/64/"+ currentCountryObject.cca2 +".png"
    countryNameEl.innerText= currentCountryObject.name.common
}  //displays user selected country info on page

function displayNews(articles) {
    for (var i = 0; i < 3; i++) {
        var newsContainer = document.getElementById('news-container-' +i)
        var newsTitleEl = newsContainer.querySelector('h2')
        var newsParaEl = newsContainer.querySelector('p')
        var newsUrlEl = newsContainer.parentElement

        var newsTitle = articles[i].title
        var newsAuthor = articles[i].author
        var newsUrl = articles[i].url
        

        newsTitleEl.textContent = newsTitle
        newsParaEl.textContent = newsAuthor
        newsUrlEl.setAttribute("href", newsUrl)
    }
} //displays news information in the containers

function removeHidden(){
 var mainContainer= document.getElementById('main-container')
 mainContainer.classList.remove('hidden')
} //removes hidden class from main-container for article and info display

function setLocalStorage(userCountry){
    var capitalizedCountry = capitalizeFirstLetter(userCountry);
    savedUserFavorites.push(capitalizedCountry); // adds capitalized input to the savedUserFavorites array
    localStorage.setItem('userFavorites', JSON.stringify(savedUserFavorites)); // sets userFavorites array to localStorage
} //pushes user input into savedUserFavorites array

function getLocalStorage() {
    var data = localStorage.getItem('userFavorites')
    return JSON.parse(data) || []
    savedUserFavorites = JSON.parse(data).value
} //calls local storage for userFavorites

function displayFavorites(){
 getLocalStorage()
 searchHistoryEl.innerHTML= ''
 //TODO code to append info into html
} //runs on page load and any time a favorite is added, will display userFavorites as elements on the page

function saveFavorite() {
 setLocalStorage(capitalizedCountry)
 displayFavorites()
} //for event listener for favorite button

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
} //takes the first letter of the string, capitalizes it, 

//TODO

//add replacement to author if no value
//add replacement for articles if non populate
//