

export async function search (event, document) {
    event.preventDefault()
    const ui = new Client.ui(document)
    const userActions = new Client.UserActions() 
    try {
        ui.showSpinner();        
        ui.scrollToResults();
        const response = await userActions.search(event.target['destination-input'].value, event.target['travelling-from-input'].value, event.target['date-input'].value, document)
        await ui.updateUI(response); 
    } catch (error) {
        ui.errorToast(error);  
        ui.clearResults();
        console.log("search error", error);
    }
}

export async function save (event, document) {
    const ui = new Client.ui(document)  
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
        const userActions = new Client.UserActions() 
        const savedTrips = await userActions.save(jsonMessage)
            
        await ui.updateSavedTrips(savedTrips, this.document);
        ui.showToastTripSaved()       
    } catch (error) {
        ui.errorToast(error);
        console.log("save error", error);
    }
}


// export async function getSavedTrips() {
//     const requests = new Client.requestsServiceClass(Client.getFetch());
//     const res = await requests.getData(`/api/saved_trips`);    
//     return res
// }

export async function vote(change, trip_id) {
    const userActions = new Client.UserActions() 
    await userActions.vote(change, trip_id)  
    
    const savedTrips = await userActions.getSavedTrips()    
    const ui = new Client.ui(document)      
    await ui.updateSavedTrips(savedTrips);
}

export async function viewTrip(trip_id) {    
    const ui = new Client.ui(document)
    const userActions = new Client.UserActions() 

    try {
        ui.showSpinner();    
        ui.scrollToResults();        
        const response = await userActions.viewTrip(trip_id)    
        await ui.updateUI(response);
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
    const ui = new Client.ui(document)      
    await ui.updateSavedTrips(savedTrips);
    return res
}