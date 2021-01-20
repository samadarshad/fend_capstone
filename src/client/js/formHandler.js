

export async function search (event, document) {
    event.preventDefault()
    const ui = new Client.ui()
    const userActions = new Client.UserActions() 
    try {
        await userActions.searchAndShowResults(event.target['destination-input'].value, event.target['travelling-from-input'].value, event.target['date-input'].value, document)
    } catch (error) {
        ui.errorToast(error);  
        ui.clearResults();
        console.log("search error", error);
    }
}

export async function sendForm(jsonMessage) {
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/search`, jsonMessage);
    return res
}

export async function save (event, document) {
    try {
        event.preventDefault()

        function getValueOfNull(obj, prop) {
            return( obj == null ? undefined : obj[prop] );
          }

        const city_name = getValueOfNull(document.getElementById("city_name"), 'innerHTML')
        const countryName = getValueOfNull(document.getElementById("countryName"), 'innerHTML')
        const from_city_name = getValueOfNull(document.getElementById("from_city_name"), 'innerHTML')
        const from_countryName = getValueOfNull(document.getElementById("from_countryName"), 'innerHTML')
        const departure_date = getValueOfNull(document.getElementById("departure_date"), 'innerHTML')
        const user_input_notes = getValueOfNull(document.getElementById("user-input-notes"), 'value')
        const date_added = new Date()
        const votes = 0;

        console.log("save date", departure_date)
        
        const jsonMessage = new Client.storeDataScheme().getJson(
            city_name,
            countryName,
            departure_date,
            from_city_name,
            from_countryName,
            user_input_notes,
            date_added,
            votes
        )

        const response = await Client.saveForm(jsonMessage)

        const savedTrips = await Client.getSavedTrips()  
        const ui = new Client.ui()      
        await ui.updateSavedTrips(savedTrips, document);
        ui.showToastTripSaved()
    } catch (error) {
        ui.errorToast(error);
        console.log("save error", error);
    }
}

export async function saveForm(jsonMessage) {
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/saved_trips`, jsonMessage);
    return res
}

export async function getSavedTrips() {
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.getData(`/api/saved_trips`);    
    return res
}

export async function vote(change, trip_id) {
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
    
    const savedTrips = await Client.getSavedTrips()    
    const ui = new Client.ui()      
    await ui.updateSavedTrips(savedTrips, document);    
    return res
}

export async function viewTrip(trip_id) {    
    const ui = new Client.ui() 
    try {
        ui.showSpinner();    
        ui.scrollToResults();
    
        const requests = new Client.requestsServiceClass(Client.getFetch());
        const tripData = await requests.getData(`/api/saved_trips/${trip_id}`);
        const storeDataSchemeClass = new Client.storeDataScheme()
    
        const date_formatted = new Date(storeDataSchemeClass.get_date(tripData)).toLocaleDateString(ui.user_date_scheme_locale)
        const jsonMessage = new Client.requestMessageScheme().getJson(
            storeDataSchemeClass.get_city_name(tripData),
            storeDataSchemeClass.get_travelling_from_city(tripData),
            date_formatted
            )
        const response = await Client.sendForm(jsonMessage)
        await ui.updateUI(response, jsonMessage, document);
    } catch (error) {
        ui.errorToast(error);
        ui.clearResults();
        console.log("view error", error);
    } 
    
}

export async function deleteTrip(trip_id) {
    localStorage.removeItem(trip_id)
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.delete(`/api/saved_trips/${trip_id}`);

    const savedTrips = await Client.getSavedTrips()    
    const ui = new Client.ui()      
    await ui.updateSavedTrips(savedTrips, document);
    return res
}