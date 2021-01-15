import "regenerator-runtime/runtime";
const createServer = require('../src/server/server')
const messageScheme = require('../src/shared/messageScheme')
const supertest = require('supertest')

const app = createServer();
const request = supertest(app)

// assumes the third party sentiment API is online, this is more of an integration test than a unit test
describe('test /sentiment', () => {
    

    it('post 200', async done => {        
        const data = new messageScheme().getJson("good data")
        const response = await request.post('/api/sentiment').send(data)    
        expect(response.status).toBe(200)
        expect(response.body.sentence_list[0].text).toBe('good data')
        done()
    })

    it('post 400', async done => {    
        const data = "bad data"  
        const response = await request.post('/api/sentiment').send(data)    
        expect(response.status).toBe(400)
        done()
    })

})