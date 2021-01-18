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
// let user_input = document.getElementsByClassName('user-input');
// for (const element of user_input) {
//     element.addEventListener("submit", e => Client.respondToSubmit(e, document) );
// }
// console.log("importing icon")
// import icon from './views/weatherIcons/a01d.png'

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('./views/weatherIcons/', false, /\.(png|jpe?g|svg)$/));

// views/weatherIcons/a01d.png'
// console.log("icon", icon)
const frag = document.createDocumentFragment();
for (const image of images) {
    
    const imageElement = document.createElement('img');
    console.log(image)
    imageElement.src = image;
    frag.appendChild(imageElement);
    // document.getElementById("results").appendChild(frag);
}
// const frag = document.createDocumentFragment();
// const image = document.createElement('img');
// image.src = icon;
// frag.appendChild(image);
document.getElementById("results").appendChild(frag);

$('.input-group.date').datepicker({
});