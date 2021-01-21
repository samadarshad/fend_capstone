class patchSavedTripsScheme {
    getJson= function (change) {
        return {
             'change': change
        }
    }

    get_change = function (jsonData) {
        return jsonData.change
    }
}; 

module.exports = patchSavedTripsScheme