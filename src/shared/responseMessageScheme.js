class responseMessageScheme {
     getJson = function (city_name, country_code, weather_forecast, pictures) {
          return {
               'city_name': city_name,
               'country_code': country_code,
               'weather_forecast': weather_forecast,
               'pictures': pictures
          }
     }

     get_city_name = function (jsonData) {
          return jsonData.city_name
     }
     get_country_code = function (jsonData) {
          return jsonData.country_code
     }
     get_weather_forecast = function (jsonData) {
          return jsonData.weather_forecast
     }
     get_pictures = function (jsonData) {
          return jsonData.pictures
     }

}; 

module.exports = responseMessageScheme