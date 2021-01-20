import { parse } from 'date-fns'

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

    const chartBuilder = new Client.ChartBuilder()

    const flightprices = responseMessageScheme.get_flightprices(response)
    const flightPricesMessage = new Client.flightPricesMessageScheme()

    if (flightprices) {
        const prices = flightprices.datePrice.map(dateprice => dateprice.price)
        const dates = flightprices.datePrice.map(dateprice => dateprice.date)
        const dates_standard = dates.map(date => parse(date, flightPricesMessage.get_flight_date_scheme, new Date()))
        const dates_mo = dates_standard.map(date => new Date(date).toLocaleDateString(undefined,  { month: 'short', year: '2-digit' }))
        const options = chartBuilder.get_options(dates_mo, prices, null)
        const chart = new ApexCharts(document.getElementById("flightprices"), options);        
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