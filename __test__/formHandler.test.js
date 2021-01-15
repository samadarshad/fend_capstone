const fetchMock = require('jest-fetch-mock')
fetchMock.enableMocks()
global.Client = require('../dist/ClientLib')

describe('formHandler', () => {
    it('when sendForm then expect /api/sentiment to be called', async done => {
        fetchMock.mockResponse(JSON.stringify({ data: '12345' }))
        Client.setFetch(fetchMock)
        const res = await Client.sendForm("Hello")
        
        expect(fetchMock.mock.calls.length).toEqual(1)
        expect(fetchMock.mock.calls[0][0]).toEqual('/api/sentiment')
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ message: 'Hello' }))
        expect(res.data).toEqual('12345')
        done()
    })

})