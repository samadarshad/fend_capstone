class requestsServiceClass {
     constructor(axios) {
          this.axios = axios
     }

     getData = async function ( url = '' ) {
          const response = await this.axios.get(url)
          .catch(function(error) {
               console.log("caught error error.response.status", error.response.status)
               return Promise.reject(new Error(error.response.status));
          }); 
          const newData = response.data;
          return newData
     }

     postData = async function ( url = '', data = {}) {
          const response = await this.axios({
               method: 'POST',
               url: url,
               credentials: 'same-origin',
               headers: {
                    'Content-Type': 'application/json',
               },
               data: data,
          })       
          .catch(function(error) {
               console.log("caught error error.response.status", error.response.status)
               return Promise.reject(new Error(error.response.status));
          }); 
          const newData = response.data;
          return newData
     };

     delete = async function ( url = '') {
          const response = await this.axios({
               method: 'DELETE',
               url: url,
               credentials: 'same-origin'
          })       
          .catch(function(error) {
               console.log("caught error error.response.status", error.response.status)
               return Promise.reject(new Error(error.response.status));
          }); 
          const newData = response.data;
          return newData
     };   
}; 

module.exports = requestsServiceClass