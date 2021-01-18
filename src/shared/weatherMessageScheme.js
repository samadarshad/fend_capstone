class weatherMessageScheme {
     getJsonWeatherForecast = function (date, temp_celcius, weatherCode) {
          return {
               'date': date,
               'temp_celcius': temp_celcius,
               'weatherCode': weatherCode
          }
      }
  
      get_date = function (jsonData) {
          return jsonData.date
      }  
      get_temp_celcius = function (jsonData) {
          return jsonData.temp_celcius
      }
      get_weatherCode = function (jsonData) {
          return jsonData.weatherCode
      }

}; 

module.exports = weatherMessageScheme