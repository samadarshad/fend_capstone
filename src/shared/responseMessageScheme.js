class responseMessageScheme {
     getJson = function (city_name, countryName, weather_forecast, pictures, flightprices) {
          return {
               'city_name': city_name,
               'countryName': countryName,
               'weather_forecast': weather_forecast,
               'pictures': pictures,
               'flightprices': flightprices
          }
     }

     get_city_name = function (jsonData) {
          return jsonData.city_name
     }
     get_countryName = function (jsonData) {
          return jsonData.countryName
     }
     get_weather_forecast = function (jsonData) {
          return jsonData.weather_forecast
     }
     get_pictures = function (jsonData) {
          return jsonData.pictures
     }
     get_flightprices = function (jsonData) {
          return jsonData.flightprices
     }

}; 

module.exports = responseMessageScheme