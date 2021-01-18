export function createResults(city_name, country_code, weather, pictures) {
    console.log("createResults")
    const results_section = document.getElementById('results')
    results_section.innerHTML = '';
    
    const frag = document.createDocumentFragment();
    const results_card = document.createElement('div');

    const pictureMessage = new Client.pictureMessageScheme()
    let carousel_inner_innerHTML = '';
    pictures.forEach(function(picture, i) {
        const pictureUrl = pictureMessage.get_url(picture)

        if (i == 0) {
            carousel_inner_innerHTML += 
            `
                <div class="carousel-item active">
                    <img class="w-100" src="${pictureUrl}" alt="Slide ${i}">
                </div>
            `
        } else {
            carousel_inner_innerHTML += 
            `
                <div class="carousel-item">
                    <img class="w-100" src="${pictureUrl}" alt="Slide ${i}">
                </div>
            `
        }
 
    })
    

    // function importAll(r) {
    //     return r.keys().map(r);
    // }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const weatherIcons = importAll(require.context('../views/weatherIcons/', false, /\.(png|jpe?g|svg)$/));
    // const images = importAll(require.context('../views/weatherIcons', false, /\.(png|jpe?g|svg)$/));
    // console.log(images[0])
    // const frag2 = document.createDocumentFragment();
    // for (const image of images) {
        
    //     const imageElement = document.createElement('img');
    //     // console.log(image)
    //     imageElement.src = image;
    //     frag2.appendChild(imageElement);
    // }
    // document.getElementById("results").appendChild(frag2);

    const weatherMessage = new Client.weatherMessageScheme()
    let weekly_weather_innerHTML = '';
    for (const day of weather) {
        const dayDate = weatherMessage.get_date(day)
        const shortDate = new Date(dayDate).toLocaleDateString(undefined,  { weekday: 'short' })
        const shortDateNum = new Date(dayDate).toLocaleDateString(undefined,  {day: 'numeric' })

        const dayTempC = weatherMessage.get_temp_celcius(day)
        const dayWeatherIcon = weatherMessage.get_weatherIcon(day)
        const weatherIcon = weatherIcons[`${dayWeatherIcon}.png`]
        const dayWeatherDescription = weatherMessage.get_weatherDescription(day)

        weekly_weather_innerHTML += 
        `
        <div class="weekly-weather-item">
            <p class="mb-0"> ${shortDate} </p> 
            <p class="mb-0"> ${shortDateNum} </p> 
            <img class="w-100" src="${weatherIcon}" alt="${dayWeatherDescription}" title="${dayWeatherDescription}">
            <i class="mdi mdi-weather-cloudy" style="font-size: 30px"></i>
            <p class="mb-0"> ${dayTempC}° </p>
        </div>
        `
    }

    const week_weather_forecast_innerHTML = `
    <h5>Week weather forecast</h5>
    <div class="weather-card p-0">
        <div class="d-flex weekly-weather">
            ${weekly_weather_innerHTML}
        </div>
    </div>
    `

    results_card.innerHTML = `
    <div class="card">
                    <div class="row">
                        <div class="col-lg-4">
                        <div id="countryCarousel" class="carousel slide" data-ride="carousel">


                            <div class="carousel-inner">
                            ${carousel_inner_innerHTML}
                            </div>
                            <a class="carousel-control-prev" href="#countryCarousel" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#countryCarousel" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                        <div class="card-text col-lg-8">
                            <h3>${city_name}, ${country_code}</h3>
                            <p>Departing from London, UK, on Wednesday 1/1/2021.</p>

                            <div class="weather">
                                ${week_weather_forecast_innerHTML}
                            </div>
                        </div>

                <div class="card-body">
                    <div class="row">
                    
                    <div class="col-12 climate-flight-graph">
                        <h5 class="text-center">Monthly climate and flight prices</h5>
                        <div id="chart"></div>
                    </div>

                    <form class="col-12 form-group">
                        <label for="user-input-notes">Notes</label>
                        <textarea class="form-control" id="user-input-notes" rows="3"></textarea>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Save (will be publically visible)</button>
                    </form>

                </div>
                </div>

            </div>
    `

    frag.appendChild(results_card)
    results_section.appendChild(frag)

    var options = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }
    
    var chart = new ApexCharts(document.getElementById("chart"), options);
    
    chart.render();
    console.log("rendered")


}
