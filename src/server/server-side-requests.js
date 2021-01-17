const axios = require('axios');
const requestsServiceClass = require('../shared/requests.js');
const serverSideRequests = new requestsServiceClass(axios);
module.exports = serverSideRequests