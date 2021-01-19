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
        console.log(event)
        const city_name = document.getElementById("city_name").innerHTML
        const country_code = document.getElementById("country_code").innerHTML
        const from_city_name = document.getElementById("from_city_name").innerHTML
        const from_country_code = document.getElementById("from_country_code").innerHTML
        const departure_date = document.getElementById("departure_date").innerHTML
        const user_input_notes = document.getElementById("user-input-notes").value
        const date_added = new Date()
        console.log(city_name, country_code, user_input_notes, from_city_name, from_country_code, departure_date, date_added)
 
    } catch (error) {
        console.log("save error", error);
    }
}


