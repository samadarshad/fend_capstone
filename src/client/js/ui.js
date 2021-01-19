export async function updateUI(response, input, document) {    
    const responseMessageScheme = new Client.responseMessageScheme()
    const requestMessageScheme = new Client.requestMessageScheme()
    Client.createResults(
        responseMessageScheme.get_city_name(response),
        responseMessageScheme.get_country_code(response),
        responseMessageScheme.get_weather_forecast(response),
        responseMessageScheme.get_pictures(response),
        requestMessageScheme.get_date(input)
        )
}

export async function updateSavedTrips(data, document) {
    const saved_trips_section = document.getElementById('saved-trips')
    if (data.length == 0) {
        localStorage.clear()
    }
    saved_trips_section.innerHTML = Client.createSavedTrips(data);
}

export const user_date_scheme = 'dd/MM/yyyy';