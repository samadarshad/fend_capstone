require('dotenv').config()

const x_rapidapi_key = process.env.X_RAPIDAPI_KEY;
const x_rapidapi_host = process.env.X_RAPIDAPI_HOST;
const base_url = process.env.X_RAPIDAPI_BASE_URL;

const requests = require('./server-side-requests');
const flightPricesMessageScheme = require('../shared/flightPricesMessageScheme.js');
const flightPricesMessage = new flightPricesMessageScheme();

class skyscannerApi {   

    getQuote = async function (from_place_id, to_place_id, date) { 
        const quotes = await this._getQuotes(from_place_id, to_place_id, date);        
        if (quotes.Quotes[0] === undefined) {
            console.log("No results for", from_place_id, to_place_id, date)
            return null;
        }
        const quote = quotes.Quotes[0].MinPrice
        return quote;
    }

    getPlace = async function (place_query) { 
        const places = await this._getPlacesId(place_query);
        if (places.Places[0] === undefined) {
            console.log("No results for", place_query)
            return '';
        }
        const place = flightPricesMessage.getJsonPlace(
            places.Places[0].PlaceName,
            places.Places[0].CountryName, 
            places.Places[0].PlaceId
        )
        return place;
    }

    _getPlacesId = async function (place_query) {
        const url = `${base_url}/autosuggest/v1.0/UK/GBP/en-GB/?query=${place_query}`
        const headers = {
            'x-rapidapi-key': x_rapidapi_key,
            'x-rapidapi-host': x_rapidapi_host
        }
        const response = await requests.getData(url, headers);
        if (response === undefined) {
            return Promise.reject(new Error(404));
        }
        return response
    }

    _getQuotes = async function (from_place_id, to_place_id, date) {
        const url = `${base_url}/browsequotes/v1.0/UK/GBP/en-GB/${from_place_id}/${to_place_id}/${date}`
        const headers = {
            'x-rapidapi-key': x_rapidapi_key,
            'x-rapidapi-host': x_rapidapi_host
        }
        const response = await requests.getData(url, headers);
        if (response === undefined) {
            return Promise.reject(new Error(404));
        }
        return response
    }

    getAnnualFlightPrices = async function (from_query, to_query) {
        const placeFrom = await this.getPlace(from_query)  
        const placeTo = await this.getPlace(to_query)
        if (!placeFrom || !placeTo) {
            return ''
        }
        let datePrices = []
        for (let i = 1; i <= 12; i++) {
            const month = i.toString().padStart(2, '0')
            const date = `2021-${month}`
            const price = await this.getQuote(placeFrom.placeId, placeTo.placeId, date)
            datePrices.push(flightPricesMessage.getJsonDatePrice(date, price))
        }
        return flightPricesMessage.getJsonSkyscanner(placeFrom, placeTo, datePrices)
    }
}

module.exports = skyscannerApi