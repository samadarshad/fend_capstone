import { parse } from 'date-fns'

export class ui {
    constructor(document) {
        this.document = document
    }

    _scrollToElement(element, offset) {
        const topOfElement = element.getBoundingClientRect().top + window.pageYOffset;
    
        window.scrollTo({
            top: topOfElement - offset,
            left: 0,
            behavior: 'smooth'
        })
    }

    scrollToResults() {
        const results_section = this.document.getElementById('results')

        this._scrollToElement(results_section, 0);
    }

    showSpinner() {
        const results_section = this.document.getElementById('results')
        results_section.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status"></div>                            
        </div>
        <p class="text-center">Loading...</p>
        `
    }

    _showToast(message) {
        const toast = this.document.getElementById('toast')
        toast.innerHTML = `
        <div class="toast-body">
        ${message}
        </div>
        `
        $('#toast').toast('show')
    }

    showToastTripSaved() {        
        this._showToast("Trip Saved.")
    }

    errorToast(error) {
        this._showToast(error)
    }

    clearResults() {
        const results_section = this.document.getElementById('results')
        results_section.innerHTML = '';
    }

    updateUI = async function(response) {    
        const responseMessageScheme = new Client.responseMessageScheme()
        // const requestMessageScheme = new Client.requestMessageScheme()
        const htmlBuilder = new Client.HtmlBuilder()
        console.log("city_name", responseMessageScheme.get_city_name(response))
        console.log("dep date", response.departureDate)
        const resultsHtml = htmlBuilder.createResults(
            responseMessageScheme.get_city_name(response),
            responseMessageScheme.get_countryName(response),
            responseMessageScheme.get_weather_forecast(response),
            responseMessageScheme.get_pictures(response),
            response.departureDate,
            response.city_from
            )
        const results_section = this.document.getElementById('results')
        results_section.innerHTML = resultsHtml;
    
        const chartBuilder = new Client.ChartBuilder()
    
        const flightprices = responseMessageScheme.get_flightprices(response)
        const flightPricesMessage = new Client.flightPricesMessageScheme()
    
        if (flightprices) {
            const prices = flightprices.datePrice.map(dateprice => dateprice.price)
            const dates = flightprices.datePrice.map(dateprice => dateprice.date)
            const dates_standard = dates.map(date => parse(date, flightPricesMessage.get_flight_date_scheme, new Date()))
            const dates_mo = dates_standard.map(date => new Date(date).toLocaleDateString('en-GB',  { month: 'short', year: '2-digit' }))
            const options = chartBuilder.get_options(dates_mo, prices, null)
            const chart = new ApexCharts(this.document.getElementById("flightprices"), options);        
            chart.render();
        } else {
            console.log("no flight prices")
            const flightprices = this.document.getElementById('flightprices')
            flightprices.innerHTML = htmlBuilder.createFlightPricesError()
        }
      
    }

    updateSavedTrips = async function(data) {
        const saved_trips_section = this.document.getElementById('saved-trips')
        console.log(data)
        if (data.length == 0) {
            console.log("resetting localStorage")
            localStorage.clear()
        }
        const htmlBuilder = new Client.HtmlBuilder()
        saved_trips_section.innerHTML = htmlBuilder.createSavedTrips(data);
    }

}