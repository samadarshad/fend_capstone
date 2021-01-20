import { parse } from 'date-fns'

export class ChartBuilder {
    get_options(dates, prices, climate) {
        return {
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
    }



}; 
