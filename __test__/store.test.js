const store = require('../src/server/store.js')
const storeUtilsClass = require('../src/server/storeUtils.js')
const storeUtils = new storeUtilsClass(store)
const storeSchemeClass = require('../src/shared/storeScheme.js')
const storeScheme = new storeSchemeClass()

describe('store', () => {
    afterEach(() => {
        storeUtils.reset()
    });

    it('when add item to store then it should show in list', done => {
        store(1, "hello")
        expect(store(1)).toBe("hello")
        done()
    })

    it('when append item to store then it should show in list with ID', done => {
        storeUtils.append({data: "world"})
        expect(store(0)).toStrictEqual({data: "world"})
        done()
    })

    it('when append multiple items to store then it should show in list with unique IDs', done => {
        storeUtils.append({data: "world0"})
        storeUtils.append({data: "world1"})
        expect(store(0)).toStrictEqual({data: "world0"})
        expect(store(1)).toStrictEqual({data: "world1"})
        done()
    }) 

    it('when append item then it returns data', done => {
        expect(storeUtils.append({data: "world"})).toStrictEqual({data: "world"})
        done()
    })

})