class weatherMessageScheme {
     getJsonWeatherForecast = function (date, temp_celcius, weatherIcon, weatherDescription) {
          return {
               'date': date,
               'temp_celcius': temp_celcius,
               'weatherIcon': weatherIcon,
               'weatherDescription': weatherDescription
          }
      }
  
      get_date = function (jsonData) {
          return jsonData.date
      }  
      get_temp_celcius = function (jsonData) {
          return jsonData.temp_celcius
      }
      get_weatherIcon = function (jsonData) {
          return jsonData.weatherIcon
      }
      get_weatherDescription = function (jsonData) {
        return jsonData.weatherDescription
    }

}; 

module.exports = weatherMessageScheme