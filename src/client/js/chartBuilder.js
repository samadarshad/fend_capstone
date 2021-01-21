export class ChartBuilder {
    get_options(dates, prices, climate) {
        let options = []
        if(prices && climate) {
            options = {
                series: [{
                name: 'Flight Price £GBP',
                type: 'line',
                data: prices
              }, {
                name: 'Temperature °C',
                type: 'column',
                data: climate
              }],  
                chart: {
                height: 350,
                type: 'line',
              },
              stroke: {
                width: [4, 0]
              },
              title: {
                text: 'Climate and Flight Prices'
              },
              dataLabels: {
                enabled: true,
                enabledOnSeries: [0]
              },          
              xaxis: {
                categories: dates
              },
              yaxis: [{
                title: {
                  text: 'Flight Prices £GBP',
                },
              }, {
                opposite: true,
                title: {
                  text: 'Temperature °C'
                }
              }]
              }
        } else if (climate) {
            options =  {
                chart: {
                    type: 'column'
                },
                series: [{
                    name: 'Temperature °C',
                    data: climate
                }],
                xaxis: {
                    categories: dates
                }
            }
        } else if (prices) {
            options =  {
                chart: {
                    type: 'line'
                },
                series: [{
                    name: 'Flight Prices £GBP',
                    data: prices
                }],
                xaxis: {
                    categories: dates
                }
            }
        }
        
        return options
    }
}; 
