global.Client = require('../dist/lib/ClientLib')

describe('validate-input', () => {
    it('when user input empty, then return false', done => {
        const res = Client.validate("")
        expect(res).toBe(false)
        done()
    })

    it('when user input, then return true', done => {
        const res = Client.validate("abc")
        expect(res).toBe(true)
        done()
    })
    

})