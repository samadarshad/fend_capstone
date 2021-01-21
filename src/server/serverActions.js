const requests = require('./server-side-requests');
const geonamesApi = require('./geonames_api.js');
const geonames = new geonamesApi()
const weatherbitApi = require('./weatherbit_api.js');
const weatherbit = new weatherbitApi()
const pixabayApi = require('./pixabay_api.js');
const pixabay = new pixabayApi()
const NUM_PICTURES = 3
const skyscannerApi = require('./skyscanner_api.js')
const skyscanner = new skyscannerApi()
const openweatherApi = require('./openweathermap_api.js')
const openweather = new openweatherApi()
const requestMessageScheme = require('../shared/requestMessageScheme');
const requestMessage = new requestMessageScheme();
const responseMessageScheme = require('../shared/responseMessageScheme');
const responseMessage = new responseMessageScheme();
const patchSavedTripsScheme = require('../shared/patchSavedTripsScheme');
const savedTrips = require('./store.js')
const storeUtilsClass = require('./storeUtils.js')
const savedTripsUtils = new storeUtilsClass(savedTrips)
const sanitizeHtml = require('sanitize-html');

class serverActions { 
    
    search = async function (input) { 
        const destination = requestMessage.get_destination(input);        
        const locationData = await geonames.getLocation(destination);
        
        const weatherData = await weatherbit.getWeather(
            geonames.get_lat(locationData), 
            geonames.get_lon(locationData)
            )

        const travelling_from = requestMessage.get_travelling_from(input);
        let skyscannerResults = ''
        let travellingFromlocationData = ''
        if (travelling_from) {
            travellingFromlocationData = await geonames.getLocation(travelling_from);
            skyscannerResults = await skyscanner.getAnnualFlightPrices(travellingFromlocationData.name, locationData.name)
        }

        let searchTerm = destination
        let pictures = await pixabay.getPictures(searchTerm, NUM_PICTURES)
        if (!pictures) {
            console.log("Could not find pictures for", searchTerm)
            searchTerm = geonames.get_countryName(locationData)
            pictures = await pixabay.getPictures(searchTerm, NUM_PICTURES)
        }

        const response = responseMessage.getJson(
            geonames.get_name(locationData), 
            geonames.get_countryName(locationData),
            weatherbit.get_weatherForecast(weatherData),
            pictures,
            skyscannerResults,
            geonames.get_name(travellingFromlocationData),
            geonames.get_countryName(travellingFromlocationData),
            requestMessage.get_date(input)
        )
        return response
    }

    save = function (input) {
        let cleanInput = {}
        for (const [key, value] of Object.entries(input)) {
            cleanInput[key] = sanitizeHtml(value)
        }
        const object = savedTripsUtils.append(cleanInput)
        return object
    }

    getSavedTrips = function () {
        return Object.entries(savedTrips())
    }

    getSavedTrip = function (id) {
        if (!savedTrips.has(id)) {
            throw new Error(404)
        }
        return savedTrips(id)
    }

    updateSavedTrip = function (id, input) {
        if (!savedTrips.has(id)) {
            throw new Error(404)
        }
        const change = new patchSavedTripsScheme().get_change(input);  
        const updatedTrip = savedTrips(id)
        updatedTrip.votes = parseInt(updatedTrip.votes) + parseInt(change);
        savedTrips.set(id, updatedTrip)
    }

    deleteSavedTrip = function(id) {
        if (!savedTrips.has(id)) {
            throw new Error(404)
        }        
        savedTrips.remove(id)
    }

    clearSavedTrips = function() {
        savedTripsUtils.reset()
    }
}

module.exports = serverActions