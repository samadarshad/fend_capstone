import { respondToSubmit, sendForm } from './js/formHandler'
import { updateUI } from './js/ui'
import requestsServiceClass from 'Shared/requests.js'
import { setFetch, getFetch } from './js/client-side-requests'
import requestMessageScheme from 'Shared/requestMessageScheme.js'
import pictureMessageScheme from 'Shared/pictureMessageScheme.js'
import weatherMessageScheme from 'Shared/weatherMessageScheme.js'
import responseMessageScheme from 'Shared/responseMessageScheme.js'
import { validate } from './js/validate-input'
import { createResults } from './js/htmlBuilder.js'


import "regenerator-runtime/runtime";
import { importAll } from './js/importImages.js'

const weatherIcons = importAll(require.context('./views/weatherIcons/', false, /\.(png|jpe?g|svg)$/));

export {
    respondToSubmit,    
    updateUI,
    sendForm,
    requestsServiceClass,
    setFetch,
    getFetch,
    requestMessageScheme,
    responseMessageScheme,
    pictureMessageScheme,
    weatherMessageScheme,
    validate,
    createResults,
    weatherIcons
}
