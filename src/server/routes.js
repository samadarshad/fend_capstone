const express = require('express');
const router = express.Router();

const geonamesApi = require('./geonames_api.js');
const geonames = new geonamesApi()
const weatherbitApi = require('./weatherbit_api.js');
const weatherbit = new weatherbitApi()
const pixabayApi = require('./pixabay_api.js');
const pixabay = new pixabayApi()
const NUM_PICTURES = 3
const skyscannerApi = require('./skyscanner_api.js')
const skyscanner = new skyscannerApi()

const requestMessageScheme = require('../shared/requestMessageScheme');
const requestMessage = new requestMessageScheme();

const responseMessageScheme = require('../shared/responseMessageScheme');
const responseMessage = new responseMessageScheme();

const patchSavedTripsScheme = require('../shared/patchSavedTripsScheme');
const savedTrips = require('./store.js')
const storeUtilsClass = require('./storeUtils.js')
const savedTripsUtils = new storeUtilsClass(savedTrips)



const sanitizeHtml = require('sanitize-html');

function sendErrorToClient(error, res) {
    res.status(error.message).send(error)  
}

router.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

router.post('/search', async function (req, res) {
    try {
        const input = req.body;
        console.log("Search term:", input)

        const destination = requestMessage.get_destination(input);        
        const locationData = await geonames.getLocation(destination);
        
        const weatherData = await weatherbit.getWeather(
            geonames.get_lat(locationData), 
            geonames.get_lon(locationData)
            )
        
        const searchTerm = `${geonames.get_name(locationData)}`
        const pictures = await pixabay.getPictures(searchTerm, NUM_PICTURES)
        
        const travelling_from = requestMessage.get_travelling_from(input);
        let skyscannerResults = ''
        if (travelling_from) {
            skyscannerResults = await skyscanner.getAnnualFlightPrices(travelling_from, destination)
        }        

        const response = responseMessage.getJson(
            weatherbit.get_name(weatherData), 
            weatherbit.get_countryCode(weatherData),
            weatherbit.get_weatherForecast(weatherData),
            pictures,
            skyscannerResults
        )
        res.send(response)

    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/saved_trips', async function (req, res) {
    try {
        const items = Object.entries(savedTrips())
        res.send(items)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.post('/saved_trips', async function (req, res) {
    try {
        const input = req.body;
        let cleanInput = {}
        for (const [key, value] of Object.entries(input)) {
            cleanInput[key] = sanitizeHtml(value)
        }
        const object = savedTripsUtils.append(cleanInput)
        res.send(object)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;

        if (!savedTrips.has(id)) {
            res.sendStatus(404)
        }
        res.send(savedTrips(id))
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.post('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const input = req.body;
        const change = new patchSavedTripsScheme().get_change(input);

        if (!savedTrips.has(id)) {
            res.sendStatus(404)
        }
        const updatedTrip = savedTrips(id)
        updatedTrip.votes = parseInt(updatedTrip.votes) + parseInt(change);
        savedTrips.set(id, updatedTrip)
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.delete('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;        

        if (!savedTrips.has(id)) {
            res.sendStatus(404)
        }
        
        savedTrips.remove(id)
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/clear_saved_trips', async function (req, res) {
    try {
        savedTripsUtils.reset()
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/test', async function (req, res) {
    const skyscanner = new skyscannerApi()
    const results = await skyscanner.getAnnualFlightPrices("london", "paris")
    
    console.log(results)
    console.log(results.placeFrom.name)
    console.log(results.placeTo.name)
    console.log(results.datePrice[0].price)

    res.sendStatus(200)
})


module.exports = router;