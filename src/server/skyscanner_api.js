require('dotenv').config()

const x_rapidapi_key = `a523806d4bmshdfa2429aa90aa36p13d104jsnc068c2a98f07`;//process.env.GEONAMES_USERNAME;
const x_rapidapi_host = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
const base_url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`//process.env.GEONAMES_API_ENDPOINT;

const requests = require('./server-side-requests');

class skyscannerApi {
    getJsonSkyscanner = function (placeFrom, placeTo, dateprice) {
        return {
            "placeFrom": placeFrom,
            "placeTo": placeTo,
            "datePrice": dateprice
        }
    }
    getJsonDatePrice = function (date, price) {
        return {
                'date': date,
                'price': price
        }
    }

    getJsonPlace = function (name, country, placeId) {
        return {
                'name': name,
                'country': country,
                'placeId': placeId
        }
    }

   get_name = function (jsonData) {
       return jsonData.name
   }  
   get_country = function (jsonData) {
       return jsonData.country
   }
   get_placeId = function (jsonData) {
       return jsonData.placeId
   }

    getQuote = async function (from_place_id, to_place_id, date) { 
        const quotes = await this._getQuotes(from_place_id, to_place_id, date);
        const quote = quotes.Quotes[0].MinPrice
        if (quote === undefined) {
            return Promise.reject(new Error(404));
        }
        return quote;
    }

    getPlace = async function (place_query) { 
        const places = await this._getPlacesId(place_query);
        const place = this.getJsonPlace(
            places.Places[0].PlaceName,
            places.Places[0].CountryName, 
            places.Places[0].PlaceId
        )
        if (place === undefined) {
            return Promise.reject(new Error(404));
        }
        return place;
    }

    _getPlacesId = async function (place_query) {
        const url = `${base_url}/autosuggest/v1.0/GB/GBP/en-GB/?query=${place_query}`
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
        const url = `${base_url}/browsequotes/v1.0/GB/GBP/en-GB/${from_place_id}/${to_place_id}/${date}`
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
        let datePrices = []
        for (let i = 1; i <= 12; i++) {
            const month = i.toString().padStart(2, '0')
            const date = `2021-${month}`
            const price = await this.getQuote(placeFrom.placeId, placeTo.placeId, date)
            datePrices.push(this.getJsonDatePrice(date, price))
        }
        return this.getJsonSkyscanner(placeFrom, placeTo, datePrices)
    }
}

module.exports = skyscannerApi