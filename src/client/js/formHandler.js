export async function respondToSubmit (event, document) {
    try {
        event.preventDefault()
        const jsonMessage = new Client.requestMessageScheme().getJson(
            event.target['destination-input'].value, 
            event.target['travelling-from-input'].value, 
            event.target['date-input'].value
            )
        const response = await Client.sendForm(jsonMessage)
        console.log(response)
        // await Client.updateUI(data, document);
    } catch (error) {
        console.log("respondToSubmit error", error);
    }
}

export async function sendForm(jsonMessage) {
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/search`, jsonMessage);
    return res
}


