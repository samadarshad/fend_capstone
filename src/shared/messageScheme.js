class messageScheme {
     getJson = function (message) {
          return {
               'message': message
          }
     }

     getMessage = function (jsonData) {
          return jsonData.message
     }
}; 

module.exports = messageScheme