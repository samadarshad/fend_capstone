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
Client.setFetch(axios)

let entry_form = document.getElementById('entry-form');
entry_form.addEventListener("submit", e => Client.respondToSubmit(e, document));

$('.input-group.date').datepicker({
});