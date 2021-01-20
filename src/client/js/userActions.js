export class UserActions {
    searchAndShowResults = async function(destination, travelling_from, date, document) {    
        const ui = new Client.ui()
        const jsonMessage = new Client.requestMessageScheme().getJson(
            destination, travelling_from, date
            )        
        ui.showSpinner();        
        ui.scrollToResults();
        const response = await Client.sendForm(jsonMessage)
        await ui.updateUI(response, jsonMessage, document);  
    }

}