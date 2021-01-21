require('dotenv').config()

const username = `abdussamad`;//process.env.GEONAMES_USERNAME;
const base_url = `http://api.geonames.org/searchJSON`//process.env.GEONAMES_API_ENDPOINT;

const requests = require('./server-side-requests');

class geonamesApi {
    getJson = function (lat, lon, name, countryName) {
         return {
              'lat': lat,
              'lon': lon,
              'name': name,
              'countryName': countryName
         }
    }

    get_lat = function (jsonData) {
         return jsonData.lat
    }
    get_lon = function (jsonData) {
         return jsonData.lon
    }
    get_name = function (jsonData) {
        return jsonData.name
    }  
    get_countryName = function (jsonData) {
        return jsonData.countryName
    }
    
    getLocation = async function (city) { 
        if (city === undefined) {
            return Promise.reject(new Error(400));
        }
        const latLon = await this._getLocation(city);
        return latLon;
    }

    _getLocation = async function (city) {
        const cityUtf8 = Buffer.from(city, 'utf-8');
        const url = `${base_url}?formatted=true&q=${cityUtf8}&maxRows=1&lang=en&username=${username}`
        const data = await requests.getData(url);
        if (data.totalResultsCount == 0) {
            return Promise.reject(new Error(404));
        }
        const locationData = this.getJson(
            data.geonames[0].lat, 
            data.geonames[0].lng, 
            data.geonames[0].name, 
            data.geonames[0].countryName
            )
        return locationData;
    }
}

module.exports = geonamesApi