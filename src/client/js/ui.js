export async function updateUI(data, document) {
    // console.log(data)
    const responseMessageScheme = new Client.responseMessageScheme()

    Client.createResults(
        responseMessageScheme.get_city_name(data),
        responseMessageScheme.get_country_code(data),
        responseMessageScheme.get_weather_forecast(data),
        responseMessageScheme.get_pictures(data))
    // Client.createResults()


    // console.log(data.sentence_list[0].text)
    // document.getElementById('results').innerHTML = JSON.stringify(data)
    // document.getElementById('agreement').innerHTML = data.agreement
    // document.getElementById('subjectivity').innerHTML = data.subjectivity
    // document.getElementById('confidence').innerHTML = data.confidence
    // document.getElementById('irony').innerHTML = data.irony
    // document.getElementById('sentence-evaluated').innerHTML = null
    // for (const sentence of data.sentence_list) {
    //     document.getElementById('sentence-evaluated').innerHTML += sentence.text
    // }
}

export async function updateSavedTrips(data, document) {
    // console.log(data)

    Client.createSavedTrips(data)
    // Client.createResults()


    // console.log(data.sentence_list[0].text)
    // document.getElementById('results').innerHTML = JSON.stringify(data)
    // document.getElementById('agreement').innerHTML = data.agreement
    // document.getElementById('subjectivity').innerHTML = data.subjectivity
    // document.getElementById('confidence').innerHTML = data.confidence
    // document.getElementById('irony').innerHTML = data.irony
    // document.getElementById('sentence-evaluated').innerHTML = null
    // for (const sentence of data.sentence_list) {
    //     document.getElementById('sentence-evaluated').innerHTML += sentence.text
    // }
}
