export async function updateUI(data, document) {
    console.log(data.sentence_list[0].text)
    document.getElementById('results').innerHTML = JSON.stringify(data)
    document.getElementById('agreement').innerHTML = data.agreement
    document.getElementById('subjectivity').innerHTML = data.subjectivity
    document.getElementById('confidence').innerHTML = data.confidence
    document.getElementById('irony').innerHTML = data.irony
    document.getElementById('sentence-evaluated').innerHTML = null
    for (const sentence of data.sentence_list) {
        document.getElementById('sentence-evaluated').innerHTML += sentence.text
    }
}
