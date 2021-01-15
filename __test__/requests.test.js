import "regenerator-runtime/runtime";
const fetch = require('node-fetch');
const requestsServiceClass = require('../src/shared/requests.js');
const request = new requestsServiceClass(fetch);

// assumed to be always online, only 50 requests per day
const onlineTestApiEndpoint = 'https://abdus-samad-weather-journal-test.free.beeceptor.com'
const onlineTestApiEndpoint404 = 'https://abdus-samad-weather-journal-test.free.beeceptor.com/nonexistant'
const onlineTestApiEndpoint403 = 'https://abdus-samad-weather-journal-test.free.beeceptor.com/methodnotallowed'

describe('test get', () => {
    it('get 200', async done => {
        const data = await request.getData(onlineTestApiEndpoint);
        expect(data).not.toBeNull();
        done()
    })

    it('get 404', async done => {
        try {
            await request.getData(onlineTestApiEndpoint404);
        } catch (e) {
            expect(e).not.toBeNull();
            expect(e).toStrictEqual(Error(404));
        }
        done()
    })
})

describe('test post', () => {
    it('post 200', async done => {
        await expect(request.postData(onlineTestApiEndpoint, {'data': 'abc'}));
        done()
    })

    it('post 403', async done => {
        try {
            await expect(request.postData(onlineTestApiEndpoint403, {'data': 'abc'}));
        } catch (e) {
            expect(e).not.toBeNull();
            expect(e).toStrictEqual(Error(403));
        }
        done()
    })
})

