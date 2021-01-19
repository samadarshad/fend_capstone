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

}; 

module.exports = storeDataScheme