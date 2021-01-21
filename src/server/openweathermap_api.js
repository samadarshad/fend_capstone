require('dotenv').config()

const base_url = process.env.OPENWEATHERMAP_BASE_URL;
const api_key = process.env.OPENWEATHERMAP_API_KEY;

const requests = require('./server-side-requests');

class openweathermapApi {
    
    getTemperature = async function (city_name, countryName, month_number) {  
        const climate = await this._getClimate(city_name, countryName, month_number);
        const temperature = climate.result.temp.mean
        return temperature;
    }

    _getClimate = async function (city_name, countryName, month_number)  {
        const cityUtf8 = Buffer.from(city_name, 'utf-8');
        const countryUtf8 = Buffer.from(countryName, 'utf-8');
        const url = `${base_url}/month?q=${cityUtf8},${countryUtf8}&month=${month_number}&units=metric&appid=${api_key}`
        console.log("_getClimate", url)
        const data = await requests.getData(url);
        console.log("_getClimate data", data)
        if (data.result.month != month_number) {
            return Promise.reject(new Error(404));
        }
        return data;
    }
}

module.exports = openweathermapApi