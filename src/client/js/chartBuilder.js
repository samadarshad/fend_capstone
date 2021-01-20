export class ChartBuilder {
    get_options(dates, prices, climate) {

        var options = {
            series: [{
            name: 'Flight Prices',
            type: 'line',
            data: prices
          }, {
            name: 'Climate',
            type: 'column',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
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
          };

        return options
        // {
        //     chart: {
        //         type: 'line'
        //     },
        //     series: [{
        //         name: '£ GBP',
        //         data: prices
        //     }],
        //     xaxis: {
        //         categories: dates
        //     }
        // }
    }



}; 
