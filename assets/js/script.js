var countriesListEl = document.getElementById("countries")
var userInputEl = document.getElementById("user-selection") 
var countryNameEl = document.getElementById("country-name")
var navEl = document.querySelector("nav")
var sidebarEl = document.getElementById("mySidebar")
var countryNameArray = []
var countryObjectArray = []
var proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='
var apiKey = '6ca5adca9d894c52b90506cf4e32af81'
var mini = true;
var validNewsCountries = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za']

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
    })
}


function newsCall(countryCode) {
    fetch (proxyUrl + encodeURIComponent('https://newsapi.org/v2/top-headlines?country='+ countryCode + '&apiKey=' + apiKey))
    .then(function(response) {
        return response.json()
    }) 
    .then(function(value) {
        // console.log(value)
        // articleArray = value.articles
        displayNews(value.articles)
    })
}  //completes call to news API and runs displayNews()

var buttonClick = document.getElementById('search-btn')


buttonClick.addEventListener('click', function(event){
    event.preventDefault()
    // console.log(userInputEl.value)
    var currentCountryObject = countryDataFinder(userInputEl.value)
    console.log(currentCountryObject)
    //local storage code
    var userCountry = userInputEl.value//variable value must be set in the function to get the value correctly
    var searchHistoryCountry = {
        name: currentCountryObject.name.common,
        code: currentCountryObject.cca2,
    }
    setLocalStorage(searchHistoryCountry)
    //local storage code
    displayCountryInfo()
    if (!!currentCountryObject) {
        newsCall(currentCountryObject.cca2.toLowerCase())
        removeHidden()
    }
    displayFavorites()
    

})


function countryDataFinder(countryName) {
    for (var i = 0; i < countryObjectArray.length; i++) {
        if(countryObjectArray[i].name.common == countryName) {
            return countryObjectArray[i]
        } 
    } 
    return null
} //selects country object based on user input value TODO add catch for incorrect inputs

function displayCountryInfo() {
    var capitalEl = document.getElementById("capital-display")
    var languageEl = document.getElementById("language-display")
    var populationEL = document.getElementById("population-display")
    var regionEl = document.getElementById("region-display")
    var flagEL = document.getElementById("country-flag")
    var currentCountryObject = countryDataFinder(userInputEl.value)
    var pop = currentCountryObject.population

    populationEL.innerText = "Population: "+ new Intl.NumberFormat().format(pop)
    regionEl.innerText = "Region: "+currentCountryObject.region
    languageEl.innerText = "Language(s): "+Object.values(currentCountryObject.languages).join(", ")
    capitalEl.innerText = "Capital: "+currentCountryObject.capital[0]
    flagEL.src = "https://www.countryflagicons.com/FLAT/64/"+ currentCountryObject.cca2 +".png"
    countryNameEl.innerText = currentCountryObject.name.common
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

function setLocalStorage(searchedCountryObject){
    var storedCountries = getLocalStorage()
    storedCountries.push(searchedCountryObject); // adds capitalized input to the storedCountries array
    localStorage.setItem('userFavorites', JSON.stringify(storedCountries)); // sets userFavorites array to localStorage
    // TODO Remove anything over 10 before saving
} //pushes user input into storedCountries array with capital letter

function getLocalStorage() {
    var data = localStorage.getItem('userFavorites')
    return JSON.parse(data) || []
} //calls local storage for userFavorites

function displayFavorites(){
    var storedCountries = getLocalStorage()
    console.log(storedCountries)
    if (storedCountries.length > 0) {
        navEl.classList.remove("hidden")
    }
    //adds search history objects to savedUserFavorites array
    sidebarEl.innerHTML= ''
    storedCountries.reverse()
    for (let i = 0; i < storedCountries.length; i++) {
        var anchorTag = document.createElement("a")
        var imgTag = document.createElement("img")
        var span = document.createElement("span")
        anchorTag.setAttribute("href", "#")
        imgTag.setAttribute("src", "https://www.countryflagicons.com/FLAT/32/"+ storedCountries[i].code +".png")
        imgTag.classList.add("flag-placeholder")
        span.innerText = storedCountries[i].name
        imgTag.setAttribute("alt", "country flag")
        span.classList.add("button-text")
        anchorTag.appendChild(imgTag)
        anchorTag.appendChild(span)
        sidebarEl.appendChild(anchorTag)
    }
}
//runs on page load and any time a favorite is added, will display userFavorites as elements on the page

function saveFavorite() {
    setLocalStorage(capitalizedCountry)
    displayFavorites()
} //for event listener for favorite button

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
} //takes the first letter of the string, capitalizes it, concats it back into a string

function toggleSidebar() {
    if (mini) {
        console.log("opening sidebar");
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        this.mini = false;
    } else {
        console.log("closing sidebar");
        document.getElementById("mySidebar").style.width = "85px";
        document.getElementById("main").style.marginLeft = "85px";
        this.mini = true;
    } // courtesy of Dalis Chan, Medium.com
}

fetchRestAPI()// calls to REST API, creates country objects for all countries and sets country names in the search bar

displayFavorites()

//TODO

//add replacement to author if no value
//add replacement for articles if non populate
//add catch if country info displays no values for each value type
//make flag picture smaller to reduce pixelation
//add catch for non country input