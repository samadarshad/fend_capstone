class storeDataScheme {
    getJson = function (city_name, country_code, date, travelling_from_city, travelling_from_country_code, notes, date_added, votes) {
        return {
             'city_name': city_name,
             'country_code': country_code,
             'date': date,
             'travelling_from_city': travelling_from_city,
             'travelling_from_country_code': travelling_from_country_code,
             'notes': notes,
             'date_added': date_added,
             'votes': votes
        }
    }

    get_city_name = function (obj) {
        return obj.city_name
    }  
    get_country_code = function (obj) {
        return obj.country_code
    }  
    get_date = function (obj) {
        return obj.date
    }
    get_travelling_from_city = function (obj) {
        return obj.travelling_from_city
    }  
    get_travelling_from_country_code = function (obj) {
        return obj.travelling_from_country_code
    }  

}; 

module.exports = storeDataScheme