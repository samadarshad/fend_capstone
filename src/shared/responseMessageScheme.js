class responseMessageScheme {
     getJson = function (city_name, countryName, weather_forecast, pictures, flightprices, city_from, countryName_from, departureDate) {
          return {
               'city_name': city_name,
               'countryName': countryName,
               'weather_forecast': weather_forecast,
               'pictures': pictures,
               'flightprices': flightprices,
               'city_from': city_from,
               'countryName_from': countryName_from,
               'departureDate': departureDate
          }
     }
}; 

module.exports = responseMessageScheme