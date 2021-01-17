class messageScheme {
     getJson = function (destination, travelling_from, date) {
          return {
               'destination': destination,
               'travelling_from': travelling_from,
               'date': date
          }
     }

     get_destination = function (jsonData) {
          return jsonData.destination
     }
     get_travelling_from = function (jsonData) {
          return jsonData.travelling_from
     }
     get_date = function (jsonData) {
          return jsonData.date
     }

}; 

module.exports = messageScheme