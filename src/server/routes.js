const express = require('express');
const router = express.Router();

const geonamesApi = require('./geonames_api.js');
const weatherbitApi = require('./weatherbit_api.js');
const pixabayApi = require('./pixabay_api.js');

const requestMessageScheme = require('../shared/requestMessageScheme');

function sendErrorToClient(error, res) {
    res.status(error.message).send(error)  
}

router.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

router.post('/search', async function (req, res) {
    try {
        const input = req.body;
        console.log(input)
        const destination = new requestMessageScheme().get_destination(input);
        const geonames = new geonamesApi()
        const locationData = await geonames.getLocation(destination);
        console.log(locationData)

        const weatherbit = new weatherbitApi()
        const weatherData = await weatherbit.getWeather(
            geonames.get_lat(locationData), 
            geonames.get_lon(locationData)
            )

        console.log(weatherData)
        // res.send(locationData)

        const pixabay = new pixabayApi()
        const searchTerm = `${geonames.get_name(locationData)}`
        const pictures = await pixabay.getPictures(searchTerm, 3)
        console.log(pictures)

        const response = {
            
        }
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

module.exports = router;