const express = require('express');
const router = express.Router();

const textApi = require('./text_api.js');

function sendErrorToClient(error, res) {
    res.status(error.message).send(error)  
}

router.get('/', function (req, res) {
    res.sendFile('dist/index.html')
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