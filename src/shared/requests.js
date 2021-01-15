class requestsServiceClass {
     constructor(fetch) {
          this.fetch = fetch
     }

     getData = async function ( url = '' ) {
          const response = await this.fetch(url); 
          if (!response.ok) {
               return Promise.reject(new Error(response.status));
          }
          const newData = response.json();
          return newData
     }

     postData = async function ( url = '', data = {}) {
          const response = await this.fetch(url, {
               method: 'POST',
               credentials: 'same-origin',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               return Promise.reject(new Error(response.status));
          }
          const newData = response.json();
          return newData
     };     
}; 

module.exports = requestsServiceClass