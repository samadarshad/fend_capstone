export class UserActions {
    search = async function(destination, travelling_from, date) {
        const jsonMessage = new Client.requestMessageScheme().getJson(
            destination, travelling_from, date
            )
        const response = await Client.sendForm(jsonMessage)
        return response
    }


    save = async function(jsonMessage) {
        await Client.saveForm(jsonMessage)
        const savedTrips = await Client.getSavedTrips()  
        return savedTrips
    }

    viewTrip = async function(trip_id) {
        const dateScheme = new Client.dateScheme()
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const tripData = await requests.getData(`/api/saved_trips/${trip_id}`);
        const storeDataSchemeClass = new Client.storeDataScheme()
    
        const date_formatted = new Date(storeDataSchemeClass.get_date(tripData)).toLocaleDateString(dateScheme.user_date_scheme_locale)
        const jsonMessage = new Client.requestMessageScheme().getJson(
            storeDataSchemeClass.get_city_name(tripData),
            storeDataSchemeClass.get_travelling_from_city(tripData),
            date_formatted
            )
        const response = await Client.sendForm(jsonMessage)
        
        return response
    }

}