export function showSpinner() {
    console.log("showing spinner")
    const results_section = document.getElementById('results')
    results_section.innerHTML = `
    <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status"></div>                            
    </div>
    <p class="text-center">Loading...</p>
    `
}

export function showToastTripSaved() {
    $('.save-trip').toast('show')
}

export async function updateUI(response, input, document) {    
    const responseMessageScheme = new Client.responseMessageScheme()
    const requestMessageScheme = new Client.requestMessageScheme()
    const htmlBuilder = new Client.HtmlBuilder()

    const resultsHtml = htmlBuilder.createResults(
        responseMessageScheme.get_city_name(response),
        responseMessageScheme.get_country_code(response),
        responseMessageScheme.get_weather_forecast(response),
        responseMessageScheme.get_pictures(response),
        requestMessageScheme.get_date(input),
        requestMessageScheme.get_travelling_from(input)
        )
    const results_section = document.getElementById('results')
    results_section.innerHTML = resultsHtml;

    const flightprices = responseMessageScheme.get_flightprices(response)
    if (flightprices) {
        const prices = flightprices.datePrice.map(dateprice => dateprice.price)
        const dates = flightprices.datePrice.map(dateprice => dateprice.date)
        console.log(prices)
        console.log(dates)

        var options = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '£ GBP',
                data: prices
            }],
            xaxis: {
                categories: dates
            }
        }
        
        var chart = new ApexCharts(document.getElementById("flightprices"), options);
        
        chart.render();
    } else {
        console.log("no flight prices")
        const flightprices = document.getElementById('flightprices')
        flightprices.innerHTML = htmlBuilder.createFlightPricesError()
    }
  

    console.log("rendered")

}

export async function updateSavedTrips(data, document) {
    const saved_trips_section = document.getElementById('saved-trips')
    if (data.length == 0) {
        localStorage.clear()
    }
    const htmlBuilder = new Client.HtmlBuilder()
    saved_trips_section.innerHTML = htmlBuilder.createSavedTrips(data);
}

export const user_date_scheme = 'dd/MM/yyyy';