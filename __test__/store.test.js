const store = require('../src/server/store.js')
const storeUtilsClass = require('../src/server/storeUtils.js')
const storeUtils = new storeUtilsClass(store)

describe('store', () => {
    afterEach(() => {
        store(false)
    });

    it('when add item to store then it should show in list', done => {
        store(1, "hello")
        expect(store(1)).toBe("hello")
        done()
    })

    it('when append item to store then it should show in list with ID', done => {
        storeUtils.append({data: "world"})
        expect(store(0)).toStrictEqual({data: "world", id: 0})
        done()
    })   

})