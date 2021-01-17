require('dotenv').config()

const api_key = `4b0bf63bff8042a19c25bc3eed6c8efc`;//process.env.GEONAMES_USERNAME;
const base_url = `http://api.weatherbit.io/v2.0/forecast/daily`//process.env.GEONAMES_API_ENDPOINT;

const requests = require('./server-side-requests');

class weatherbitApi {
    getJson = function (name, countryCode, weatherForecast) {
         return {
              'weatherForecast': weatherForecast,
              'name': name,
              'countryCode': countryCode
         }
    }

    get_name = function (jsonData) {
        return jsonData.name
    }  
    get_countryCode = function (jsonData) {
        return jsonData.countryCode
    }
    get_weatherForecast = function (jsonData) {
        return jsonData.weatherForecast
    }

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
    
    getWeather = async function (lat, lon) { 
        if (lat === undefined || lon === undefined) {
            return Promise.reject(new Error(400));
        }
        const weather = await this._getWeather(lat, lon);
        return weather;
    }

    _getWeather = async function (lat, lon) {
        const url = `${base_url}?&lat=${lat}&lon=${lon}&key=${api_key}`
        const response = await requests.getData(url);
        if (response === undefined) {
            return Promise.reject(new Error(404));
        }
        const weatherForecast = response.data.map(day => this.getJsonWeatherForecast(day.valid_date, day.temp, day.weather.code))
        console.log("weatherForecast", weatherForecast)
        const weather = this.getJson(
            response.city_name,
            response.country_code, 
            weatherForecast
        )
        return weather
    }
}

module.exports = weatherbitApi