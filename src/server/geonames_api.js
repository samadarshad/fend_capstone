require('dotenv').config()

const username = `abdussamad`;//process.env.GEONAMES_USERNAME;
const base_url = `http://api.geonames.org/searchJSON`//process.env.GEONAMES_API_ENDPOINT;

const requests = require('./server-side-requests');

module.exports = {
    getLatLon: async function (city) { 
        if (city === undefined) {
            return Promise.reject(new Error(400));
        }
        const latLon = await _getLatLon(city);
        return latLon;
    }
}

const _getLatLon = async (city) => {
    const cityUtf8 = Buffer.from(city, 'utf-8');
    const url = `${base_url}?formatted=true&q=${cityUtf8}&maxRows=1&lang=en&username=${username}&style=short`
    console.log("_getLatLon url: ", url);
    const data = await requests.getData(url);
    console.log("_getLatLon data: ", data);
    return data;
}