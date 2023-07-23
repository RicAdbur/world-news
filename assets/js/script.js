var userInputEl = document.getElementById("user-selection") 
var navEl = document.querySelector("nav")
var sidebarEl = document.getElementById("mySidebar")
var buttonClick = document.getElementById('search-btn')
var countryObjectArray = []
var proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='
var apiKey = '16fd0419d9a245f9881c879b46493a80'
var mini = true;
var clearHistoryBtn = document.getElementById('clear-history-btn')

var validNewsCountries = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za']

function fetchRestAPI() {
    fetch ("https://restcountries.com/v3.1/independent?status=true&fields=name,languages,capital,cca2,region,subregion,population")
    .then(function(response) {
        return response.json()
    })
    .then(function(allCountryData) {
        // populates the dropdown menu options to the id in datalist
        for ( var i = 0; i < allCountryData.length; i++) {
            if (validNewsCountries.includes(allCountryData[i].cca2.toLowerCase() ) ) {
                var dropdownListItems = document.createElement("option")
                var countriesListEl = document.getElementById("countries")
                dropdownListItems.value = allCountryData[i].name.common
                countriesListEl.appendChild(dropdownListItems)
                countryObjectArray.push(allCountryData[i])
            }
        }
    })
} // RestAPI fetch request

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
} // completes call to news API and runs displayNews()

function countryDataFinder(countryName) {
    for (var i = 0; i < countryObjectArray.length; i++) {
        if (countryObjectArray[i].name.common.toLowerCase() === countryName.toLowerCase()) {
            return countryObjectArray[i]
        } 
    }
    return null
} // selects country object based on user input value TODO add catch for incorrect inputs

function displayCountryInfo() {
    var countryNameEl = document.getElementById("country-name")
    var capitalEl = document.getElementById("capital-display")
    var languageEl = document.getElementById("language-display")
    var populationEL = document.getElementById("population-display")
    var regionEl = document.getElementById("region-display")
    var flagEL = document.getElementById("country-flag")
    var currentCountryObject = countryDataFinder(userInputEl.value)
    var pop = currentCountryObject.population

    if(pop===null){
        populationEL.innerText = "No Data Avavilable"
    } else{
        populationEL.innerText = "Population: "+ new Intl.NumberFormat().format(pop)
    }
    
    if(currentCountryObject.region===null){
        regionEl.innerText = "No Data Avavilable"
    } else{
        regionEl.innerText = "Region: "+currentCountryObject.region
    }
    
    if (currentCountryObject.language===null) {
        languageEl.innerText = "No Data Available"
    } else {
        languageEl.innerText = "Language(s): "+Object.values(currentCountryObject.languages).join(", ")
    }
    
    if(currentCountryObject.capital[0]===null){
        capitalEl.innerText = "No Data Avavilable"
    } else {
        capitalEl.innerText = "Capital: "+currentCountryObject.capital[0]
    }
        
    flagEL.src = "https://www.countryflagicons.com/FLAT/64/"+ currentCountryObject.cca2 +".png"
        
    countryNameEl.innerText = currentCountryObject.name.common
    
} // displays user selected country info on page

function displayNews(articles) {
    for (var i = 0; i < 3; i++) {
        var newsContainer = document.getElementById('news-container-' +i)
        var newsTitleEl = newsContainer.querySelector('h2')
        var newsParaEl = newsContainer.querySelector('p')
        var newsUrlEl = newsContainer.parentElement

        var newsTitle = articles[i].title
        var newsAuthor = articles[i].author
        var newsUrl = articles[i].url
        
         if (newsTitle===null){
            newsTitleEl.textContent = "No news avavilable! Try a different country"
         } else {
            newsTitleEl.textContent = newsTitle
        if (newsAuthor === null){
                newsParaEl.textContent = "Unknown Author"
            }  else {
                newsParaEl.textContent = newsAuthor
            }
         }
        newsUrlEl.setAttribute("href", newsUrl)
    }
    userInputEl.value = "" //clear user entry

} // displays news information in the containers

function removeHiddenMain(){
    var mainContainer= document.getElementById('main-container')
    mainContainer.classList.remove('hidden')
} // removes hidden class from main-container for article and info display

function setLocalStorage(searchedCountryObject) {
    var storedCountries = getLocalStorage();
    var storedCountrySet = new Set(storedCountries.map(country => country.code));
  
    // check if the country code already exists in the Set
    if (!storedCountrySet.has(searchedCountryObject.code)) {
      storedCountries.push(searchedCountryObject);
      localStorage.setItem('userFavorites', JSON.stringify(storedCountries));
    }
} // pushes user input into storedCountries array with capital letter

function getLocalStorage() {
    var data = localStorage.getItem('userFavorites')
    return JSON.parse(data) || []
} // calls local storage for userFavorites

function displayFavorites(){
    var storedCountries = getLocalStorage()
    // check if there are stored countries
    if (storedCountries.length > 0) {
        navEl.classList.remove("hidden")
        document.getElementById("main").classList.remove("margin-correction")
        // limits search history to max of 10 results
        if (storedCountries.length > 10) {
            storedCountries = storedCountries.slice(-10)
        }
        // adds search history objects to savedUserFavorites array
        sidebarEl.innerHTML= ''
        storedCountries.reverse()
        for (let i = 0; i < storedCountries.length; i++) {
            var anchorTag = document.createElement("a")
            var imgTag = document.createElement("img")
            var span = document.createElement("span")
            anchorTag.setAttribute("href", "#")
            imgTag.setAttribute("src", "https://www.countryflagicons.com/FLAT/32/"+ storedCountries[i].code +".png")
            imgTag.setAttribute("alt", "country flag")
            imgTag.classList.add("flag-placeholder")
            span.innerText = storedCountries[i].name
            span.classList.add("button-text")
            anchorTag.appendChild(imgTag)
            anchorTag.appendChild(span)
            sidebarEl.appendChild(anchorTag)     

            anchorTag.addEventListener('click', function(event){
                event.preventDefault()
                userInputEl.value = storedCountries[i].name
                displayCountryInfo()
                newsCall(storedCountries[i].code.toLowerCase())
                removeHiddenMain()
            })//event listener for history clicks

        }
        // Show the "Clear History" button
        clearHistoryBtn.classList.remove('hidden')
    } else {
        // Hide the "Clear History" button when there are no favorites
        navEl.classList.add('hidden')
        clearHistoryBtn.classList.add('hidden')
        document.getElementById("main").classList.add("margin-correction")
    }
    sidebarEl.appendChild(clearHistoryBtn);
} // runs on page load and any time a favorite is added, will display userFavorites as elements on the page

function saveFavorite() {
    setLocalStorage(capitalizedCountry)
    displayFavorites()
} // for event listener for favorite button

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
} // takes the first letter of the string, capitalizes it, concats it back into a string

function toggleSidebar() {
    if (mini) {
        document.getElementById("mySidebar").style.width = "250px"
        document.getElementById("main").style.marginLeft = "250px"
        this.mini = false;
    } else {
        document.getElementById("mySidebar").style.width = "85px"
        document.getElementById("main").style.marginLeft = "85px"
        this.mini = true;
    } // courtesy of Dalis Chan, Medium.com
} // sidebar mouseover action

function clearHistory() {
    // Clear the user's search history from localStorage
    localStorage.removeItem('userFavorites')
  
    // Update the displayed favorites in the navigation
    displayFavorites()
}

clearHistoryBtn.addEventListener('click', clearHistory)
  
buttonClick.addEventListener('click', function(event){
      event.preventDefault()
      
      // console.log(userInputEl.value)
      var currentCountryObject = countryDataFinder(userInputEl.value)
       if (currentCountryObject === null) {
          return;
           }
      //local storage code
      var searchHistoryCountry = {
          name: currentCountryObject.name.common,
          code: currentCountryObject.cca2,
      }
      setLocalStorage(searchHistoryCountry)
      //local storage code
      displayCountryInfo()
  
          newsCall(currentCountryObject.cca2.toLowerCase())
          removeHiddenMain()
          displayFavorites()
} ) // event listener for search button
    
document.addEventListener('DOMContentLoaded', () => {
  
        // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
      // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
    
        $trigger.addEventListener('click', () => {
          var currentCountryObject = countryDataFinder(userInputEl.value)
          if (currentCountryObject === null) {
          openModal($target);
          }
        });
      });
    
      // Add a click event on various child elements to close the parent modal
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
    
        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });
}); // Bulma Modal functions

fetchRestAPI() // calls to REST API, creates country objects for all countries and sets country names in the search bar
  
displayFavorites()