export async function search (event, document) {
    try {
        event.preventDefault()
        const jsonMessage = new Client.requestMessageScheme().getJson(
            event.target['destination-input'].value, 
            event.target['travelling-from-input'].value, 
            event.target['date-input'].value
            )
        const response = await Client.sendForm(jsonMessage)
        await Client.updateUI(response, document);
    } catch (error) {
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

        const city_name = document.getElementById("city_name").innerHTML
        const country_code = document.getElementById("country_code").innerHTML
        const from_city_name = document.getElementById("from_city_name").innerHTML
        const from_country_code = document.getElementById("from_country_code").innerHTML
        const departure_date = document.getElementById("departure_date").innerHTML
        const user_input_notes = document.getElementById("user-input-notes").value
        const date_added = new Date()
        const votes = 0;
        
        const jsonMessage = new Client.storeDataScheme().getJson(
            city_name,
            country_code,
            departure_date,
            from_city_name,
            from_country_code,
            user_input_notes,
            date_added,
            votes
        )

        const response = await Client.saveForm(jsonMessage)
        console.log(response)

        const savedTrips = await Client.getSavedTrips()        
        await Client.updateSavedTrips(savedTrips, document);
    } catch (error) {
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
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/saved_trips/${trip_id}`, {"change": change});    
    return res
}