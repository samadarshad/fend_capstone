import { search, sendForm, save, saveForm, getSavedTrips, vote } from './js/formHandler'
import { updateUI, updateSavedTrips } from './js/ui'
import requestsServiceClass from 'Shared/requests.js'
import { setFetch, getFetch } from './js/client-side-requests'
import requestMessageScheme from 'Shared/requestMessageScheme.js'
import pictureMessageScheme from 'Shared/pictureMessageScheme.js'
import weatherMessageScheme from 'Shared/weatherMessageScheme.js'
import responseMessageScheme from 'Shared/responseMessageScheme.js'
import storeDataScheme from 'Shared/storeDataScheme.js'
import storeScheme from 'Shared/storeScheme.js'
import { validate } from './js/validate-input'
import { createResults, createSavedTrips, IdToHtmlId, HtmlIdToId, vote_up, vote_down } from './js/htmlBuilder.js'

import "regenerator-runtime/runtime";
import { importAll } from './js/importImages.js'

const weatherIcons = importAll(require.context('./views/weatherIcons/', false, /\.(png|jpe?g|svg)$/));

export {
    search,
    save,
    updateUI,
    updateSavedTrips,
    sendForm,
    saveForm,
    getSavedTrips,
    vote,

    requestsServiceClass,
    setFetch,
    getFetch,
    requestMessageScheme,
    responseMessageScheme,
    pictureMessageScheme,
    weatherMessageScheme,
    storeDataScheme,
    storeScheme,
    validate,
    
    createResults,
    createSavedTrips,
    IdToHtmlId,
    HtmlIdToId,
    vote_up,
    vote_down,

    weatherIcons,

}
