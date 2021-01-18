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
        // const response = "abc"
        await Client.updateUI(response, document);
    } catch (error) {
        console.log("respondToSubmit error", error);
    }
}

export async function sendForm(jsonMessage) {
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/search`, jsonMessage);
    return res
}


