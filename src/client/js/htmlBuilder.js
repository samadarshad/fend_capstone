export function createResults(city_name, country_code, weather, pictures) {
    console.log("createResults")
    const countryCarouselImages = document.getElementById('countryCarousel').getElementsByClassName('carousel-inner')[0]
    const frag = document.createDocumentFragment();
    const carouselElement = document.createElement('div')
    carouselElement.setAttribute('class', 'carousel-item')
    const imageElement = document.createElement('img')
    imageElement.setAttribute('class', 'w-100')
    imageElement.setAttribute('alt', 'First slide')
    imageElement.setAttribute('src', "<%=require('./img/team1.png')%>")
    carouselElement.appendChild(imageElement)
    frag.appendChild(carouselElement)
    console.log(frag)
    countryCarouselImages.appendChild(frag)
    // <img class="w-100" src="<%=require('./img/team1.png')%>" alt="First slide">
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
