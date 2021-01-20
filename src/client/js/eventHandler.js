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
    event.preventDefault()
    const ui = new Client.ui(document)
    const userActions = new Client.UserActions()
    try { 

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
         
        const savedTrips = await userActions.save(jsonMessage)            
        await ui.updateSavedTrips(savedTrips, this.document);
        ui.showToastTripSaved()       
    } catch (error) {
        ui.errorToast(error);
        console.log("save error", error);
    }
}

export async function vote(change, trip_id) {
    const ui = new Client.ui(document)
    const userActions = new Client.UserActions() 
    try {
        await userActions.vote(change, trip_id)  
        const savedTrips = await userActions.getSavedTrips()       
        await ui.updateSavedTrips(savedTrips);
    } catch (error) {
        ui.errorToast(error);
        console.log("vote error", error);
    } 
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
        console.log("viewTrip error", error);
    }     
}

export async function deleteTrip(trip_id) {
    const ui = new Client.ui(document)
    const userActions = new Client.UserActions() 
    try {
        await userActions.deleteTrip(trip_id)
        const savedTrips = await userActions.getSavedTrips()  
        await ui.updateSavedTrips(savedTrips);
    } catch (error) {
        ui.errorToast(error);
        console.log("deleteTrip error", error);
    } 
}