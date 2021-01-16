// import './styles/resets.scss'
// import './styles/base.scss'
// import './styles/form.scss'
// import './styles/footer.scss'
// import './styles/header.scss'
import './views/style_travelapp.scss'
import ApexCharts from 'apexcharts'

// const fetch = window.fetch.bind(window);
// Client.setFetch(fetch)
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