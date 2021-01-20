export class UserActions {
    search = async function(destination, travelling_from, date) {
        const jsonMessage = new Client.requestMessageScheme().getJson(
            destination, travelling_from, date
            )
        const response = await this._sendForm(jsonMessage)
        return response
    }

    _sendForm = async function (jsonMessage) {
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const res = await requests.postData(`/api/search`, jsonMessage);
        return res
    }

    _saveForm = async function (jsonMessage) {
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const res = await requests.postData(`/api/saved_trips`, jsonMessage);
        return res
    }

    save = async function(jsonMessage) {
        await this._saveForm(jsonMessage)
        const savedTrips = await this.getSavedTrips()  
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
        const response = await this._sendForm(jsonMessage)

        return response
    }

    getSavedTrips = async function () {
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const res = await requests.getData(`/api/saved_trips`);    
        return res
    }

    vote = async function (change, trip_id) {
        let newVal = change
        if (localStorage.getItem(trip_id) != null) {
            newVal = parseInt(localStorage.getItem(trip_id)) + parseInt(change)
        }
        localStorage.setItem(trip_id, newVal)
        if (parseInt(localStorage.getItem(trip_id)) == 0) {
            localStorage.removeItem(trip_id)
        }
    
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const jsonMessage = new Client.patchSavedTripsScheme().getJson(change)
        const res = await requests.postData(`/api/saved_trips/${trip_id}`, jsonMessage);
        return res
    }

}