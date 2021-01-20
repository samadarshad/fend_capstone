export async function updateUI(response, input, document) {    
    const responseMessageScheme = new Client.responseMessageScheme()
    const requestMessageScheme = new Client.requestMessageScheme()

    const resultsHtml = Client.createResults(
        responseMessageScheme.get_city_name(response),
        responseMessageScheme.get_country_code(response),
        responseMessageScheme.get_weather_forecast(response),
        responseMessageScheme.get_pictures(response),
        requestMessageScheme.get_date(input),
        requestMessageScheme.get_travelling_from(input)
        )
    const results_section = document.getElementById('results')
    results_section.innerHTML = resultsHtml;


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

export async function updateSavedTrips(data, document) {
    const saved_trips_section = document.getElementById('saved-trips')
    if (data.length == 0) {
        localStorage.clear()
    }
    saved_trips_section.innerHTML = Client.createSavedTrips(data);
}

export const user_date_scheme = 'dd/MM/yyyy';