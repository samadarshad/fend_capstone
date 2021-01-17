const express = require('express');
const router = express.Router();

const textApi = require('./text_api.js');
const geonamesApi = require('./geonames_api.js');
const messageScheme = require('../shared/messageScheme');

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
        const destination = new messageScheme().get_destination(input);
        const geonames = new geonamesApi()
        const locationData = await geonames.getLocation(destination);
        res.send(locationData)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.post('/sentiment', async function (req, res) {
    try {
        const inputText = req.body;
        const sentimentData = await textApi.getSentimentData(inputText);
        res.send(sentimentData)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

module.exports = router;