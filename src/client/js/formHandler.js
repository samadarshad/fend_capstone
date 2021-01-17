export async function respondToSubmit (event, document) {
    try {
        event.preventDefault()

        let entry_input = {
            destination_input: event.target['destination-input'].value,
            travelling_from_input: event.target['travelling-from-input'].value,
            date_input: event.target['date-input'].value
        }
        console.log(entry_input)


        // let formText = document.getElementById('name').value
        // if (Client.validate(formText) == false) {
        //     alert("Please enter sentence")
        //     return
        // }
        // const data = await Client.sendForm(formText)
        // await Client.updateUI(data, document);
    } catch (error) {
        console.log("respondToSubmit error", error);
    }
}

export async function sendForm(text) {
    const jsonMessage = new Client.messageScheme().getJson(text)
    const requests = new Client.requestsServiceClass(Client.getFetch());
    const res = await requests.postData(`/api/sentiment`, jsonMessage);
    return res
}


