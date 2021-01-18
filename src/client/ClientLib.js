import { respondToSubmit, sendForm } from './js/formHandler'
import { updateUI } from './js/ui'
import requestsServiceClass from 'Shared/requests.js'
import { setFetch, getFetch } from './js/client-side-requests'
import requestMessageScheme from 'Shared/requestMessageScheme.js'
import responseMessageScheme from 'Shared/responseMessageScheme.js'
import { validate } from './js/validate-input'

import "regenerator-runtime/runtime";

export {
    respondToSubmit,    
    updateUI,
    sendForm,
    requestsServiceClass,
    setFetch,
    getFetch,
    requestMessageScheme,
    responseMessageScheme,
    validate
}
