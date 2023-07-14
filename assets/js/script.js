fetch ("https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,cca2")
.then(function(response) {
    return response.json()
})
.then(function(countryDataArray) {
    for ( var i = 0; i < countryDataArray.length; i++) {
        var countryName = countryDataArray[i].name.common
        console.log(countryName)
    }
})