const fetch = require('node-fetch');
const requestsServiceClass = require('../shared/requests.js');
const serverSideRequests = new requestsServiceClass(fetch);
module.exports = serverSideRequests