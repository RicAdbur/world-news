var countriesListEl = document.getElementById("countries")
var countryArray = []

fetch ("https://restcountries.com/v3.1/all?fields=name")
.then(function(response) {
    return response.json()
})
.then(function(countryDataArray) {
    for ( var i = 0; i < countryDataArray.length; i++) {
        var countryName = countryDataArray[i].name.common
        // console.log(countryName)
        countryArray[i] = countryName
        var dropdownListItems = document.createElement("option")
        // dropdownListItems.text = countryArray[i]
        dropdownListItems.value = countryArray[i]
        countriesListEl.appendChild(dropdownListItems)
        }
})


console.log(countryArray)