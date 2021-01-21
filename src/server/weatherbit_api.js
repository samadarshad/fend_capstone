require('dotenv').config()

const api_key = process.env.WEATHERBIT_API_KEY;
const base_url = process.env.WEATHERBIT_BASE_URL;

const requests = require('./server-side-requests');
const weatherMessageScheme = require('../shared/weatherMessageScheme');
const weatherMessage = new weatherMessageScheme();

class weatherbitApi {
    getJson = function (name, countryName, weatherForecast) {
         return {
              'weatherForecast': weatherForecast,
              'name': name,
              'countryName': countryName
         }
    }

    get_name = function (jsonData) {
        return jsonData.name
    }  
    get_countryName = function (jsonData) {
        return jsonData.countryName
    }
    get_weatherForecast = function (jsonData) {
        return jsonData.weatherForecast
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
        
        const weatherForecast = response.data.map(day => weatherMessage.getJsonWeatherForecast(day.valid_date, day.temp, day.weather.icon, day.weather.description))
        const weather = this.getJson(
            response.city_name,
            response.countryName, 
            weatherForecast
        )
        return weather
    }
}

module.exports = weatherbitApi