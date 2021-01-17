// import './styles/resets.scss'

import './styles/utils.scss'
import './styles/navbar.scss'
import './styles/entryform.scss'
import './styles/footer.scss'
import './styles/results.scss'
import './styles/saved_trips.scss'
import './styles/base.scss'
import ApexCharts from 'apexcharts'



import axios from 'axios';
// const fetch = window.fetch.bind(window);
// Client.setFetch(axios)
let res = axios.get("https://abdus-samad-weather-journal-test.free.beeceptor.com")
console.log("axios get", res)
// let user_input = document.getElementsByClassName('user-input');
// for (const element of user_input) {
//     element.addEventListener("submit", e => Client.respondToSubmit(e, document) );
// }


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

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
console.log("rendered")

// $(document).ready(function(){
//     $('#datepicker').datepicker(); 
//    });
$('.input-group.date').datepicker({
});