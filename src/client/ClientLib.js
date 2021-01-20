import { search, sendForm, save, saveForm, getSavedTrips, vote, deleteTrip, viewTrip } from './js/formHandler'
import { updateUI, updateSavedTrips, user_date_scheme } from './js/ui'
import requestsServiceClass from 'Shared/requests.js'
import { setFetch, getFetch } from './js/client-side-requests'
import requestMessageScheme from 'Shared/requestMessageScheme.js'
import pictureMessageScheme from 'Shared/pictureMessageScheme.js'
import weatherMessageScheme from 'Shared/weatherMessageScheme.js'
import responseMessageScheme from 'Shared/responseMessageScheme.js'
import storeDataScheme from 'Shared/storeDataScheme.js'
import storeScheme from 'Shared/storeScheme.js'
import patchSavedTripsScheme from 'Shared/patchSavedTripsScheme.js'

import { validate } from './js/validate-input'
import { HtmlBuilder } from './js/htmlBuilder.js'

import "regenerator-runtime/runtime";
import { importAll } from './js/importImages.js'

const weatherIcons = importAll(require.context('./views/weatherIcons/', false, /\.(png|jpe?g|svg)$/));

export {
    search,
    save,
    updateUI,
    updateSavedTrips,
    user_date_scheme,
    
    sendForm,
    saveForm,
    getSavedTrips,
    vote,
    deleteTrip,
    viewTrip,

    requestsServiceClass,
    setFetch,
    getFetch,
    requestMessageScheme,
    responseMessageScheme,
    pictureMessageScheme,
    weatherMessageScheme,
    storeDataScheme,
    storeScheme,
    patchSavedTripsScheme,
    
    validate,
    
    HtmlBuilder,

    weatherIcons,

}
