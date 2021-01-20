class flightPricesMessageScheme {
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

}; 

module.exports = flightPricesMessageScheme