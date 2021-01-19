class storeScheme {
    getJson = function (id, data) {
        return {
             'id': id,
             'data': data
        }
    }

    get_id = function (jsonData) {
        return jsonData.id
    }  
    get_data = function (jsonData) {
        return jsonData.data
    }

}; 

module.exports = storeScheme