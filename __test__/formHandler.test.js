const axios = require('axios');
const MockAcapter = require('axios-mock-adapter');
const mock = new MockAcapter(axios);

global.Client = require('../dist/ClientLib')

describe('formHandler', () => {
    it('when sendForm then expect /api/sentiment to be called', async done => {
        mock.onPost("/api/sentiment").reply(200, {
            data: '12345'
        })
        Client.setFetch(axios)

        const res = await Client.sendForm("Hello")

        expect(mock.history.post.length).toBe(1)
        expect(mock.history.post[0].url).toBe('/api/sentiment')
        expect(mock.history.post[0].data).toBe(JSON.stringify({ message: 'Hello' }))
        expect(res.data).toEqual('12345')
        done()
    })

})