const express = require('express');
const router = express.Router();

const serverActionsClass = require('./serverActions.js')
const serverActions = new serverActionsClass()

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
        const response = await serverActions.search(input)
        res.send(response)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/saved_trips', async function (req, res) {
    try {
        const items = serverActions.getSavedTrips()
        res.send(items)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.post('/saved_trips', async function (req, res) {
    try {
        const input = req.body;
        const object = serverActions.save(input)
        res.send(object)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const object = serverActions.getSavedTrip(id)
        res.send(object)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.post('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const input = req.body;
        serverActions.updateSavedTrip(id, input)
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.delete('/saved_trips/:id', async function (req, res) {
    try {
        const id = req.params.id;        
        serverActions.deleteSavedTrip(id)
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

router.get('/clear_saved_trips', async function (req, res) {
    try {
        serverActions.clearSavedTrips()        
        res.sendStatus(200)
    } catch (error) {
        console.log("routes error", error);
        sendErrorToClient(error, res);
    }    
})

// router.get('/testskyscanner', async function (req, res) {
//     const skyscanner = new skyscannerApi()
//     const results = await skyscanner.getAnnualFlightPrices("london", "paris")
    
//     console.log(results)
//     console.log(results.placeFrom.name)
//     console.log(results.placeTo.name)
//     console.log(results.datePrice[0].price)

//     res.sendStatus(200)
// })

// router.get('/testopenweather', async function (req, res) {
//     const results = await openweather.getTemperature("london", "GB", 1)
    
//     console.log(results)

//     res.sendStatus(200)
// })


module.exports = router;