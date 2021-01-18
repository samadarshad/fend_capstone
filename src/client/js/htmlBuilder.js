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

    // const carousel_inner_innerHTML = `
    //     <div class="carousel-item active">
    //         <img class="w-100" src="https://pixabay.com/get/55e0d340485aa814f1dc846096293e761d36dde45a4c704f742f72d39249c65c_640.jpg" alt="First slide">
    //     </div>
    //     <div class="carousel-item">
    //         <img class="w-100" src="https://pixabay.com/get/55e1d4404953a414f1dc846096293e761d36dde45a4c704f742f72d39249c65c_640.jpg" alt="Second slide">
    //     </div>
    //     <div class="carousel-item">
    //         <img class="w-100" src="https://pixabay.com/get/55e2dc414351ae14f1dc846096293e761d36dde45a4c704f742f72d39249c65c_640.jpg" alt="Third slide">
    //     </div>
    // `    

    const week_weather_forecast_innerHTML = `
    <h5>Week weather forecast</h5>
    <div class="weather-card p-0">
        <div class="d-flex weekly-weather">
            <div class="weekly-weather-item">
                <p class="mb-0"> Sun </p> <i class="mdi mdi-weather-cloudy"></i>
                <p class="mb-0"> 30° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Mon </p> <i class="mdi mdi-weather-hail"></i>
                <p class="mb-0"> 31° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Tue </p> <i class="mdi mdi-weather-partlycloudy"></i>
                <p class="mb-0"> 28° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Wed </p> <i class="mdi mdi-weather-pouring"></i>
                <p class="mb-0"> 30° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Thu </p> <i class="mdi mdi-weather-pouring"></i>
                <p class="mb-0"> 29° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Fri </p> <i class="mdi mdi-weather-snowy-rainy"></i>
                <p class="mb-0"> 31° </p>
            </div>
            <div class="weekly-weather-item">
                <p class="mb-1"> Sat </p> <i class="mdi mdi-weather-snowy"></i>
                <p class="mb-0"> 32° </p>
            </div>
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
