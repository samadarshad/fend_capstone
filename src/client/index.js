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
const ui = new Client.ui(document)
const userActions = new Client.UserActions()
document.addEventListener('DOMContentLoaded', async function(event) {
    $('#input-group-datepicker').datepicker({
        todayBtn: "linked",
        todayHighlight: true
    });

    const savedTrips = await userActions.getSavedTrips()
    await ui.updateSavedTrips(savedTrips);
});

document.addEventListener('submit', function(e) {
    if(e.target && e.target.id == 'entry-form'){
        Client.search(e, document)
    }

    if(e.target && e.target.id == 'save-user'){
        e.preventDefault()
        Client.save(e, document)
    }
});


