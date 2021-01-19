export async function updateUI(data, document) {
    const responseMessageScheme = new Client.responseMessageScheme()

    Client.createResults(
        responseMessageScheme.get_city_name(data),
        responseMessageScheme.get_country_code(data),
        responseMessageScheme.get_weather_forecast(data),
        responseMessageScheme.get_pictures(data))
}

export async function updateSavedTrips(data, document) {
    console.log("updateSavedTrips", data)
    const saved_trips_section = document.getElementById('saved-trips')
    saved_trips_section.innerHTML = Client.createSavedTrips(data);
}
