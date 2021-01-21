class storeDataScheme {
    getJson = function (city_name, countryName, date, travelling_from_city, travelling_from_countryName, notes, date_added, votes) {
        return {
             'city_name': city_name,
             'countryName': countryName,
             'date': date,
             'travelling_from_city': travelling_from_city,
             'travelling_from_countryName': travelling_from_countryName,
             'notes': notes,
             'date_added': date_added,
             'votes': votes
        }
    }

    get_city_name = function (obj) {
        return obj.city_name
    }  
    get_countryName = function (obj) {
        return obj.countryName
    }  
    get_date = function (obj) {
        return obj.date
    }
    get_travelling_from_city = function (obj) {
        return obj.travelling_from_city
    }  
    get_travelling_from_countryName = function (obj) {
        return obj.travelling_from_countryName
    }  

}; 

module.exports = storeDataScheme