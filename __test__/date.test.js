import { compareAsc, parse } from 'date-fns'
const weatherSchemeClass = require('../src/shared/weatherMessageScheme.js')
const weatherDateScheme = new weatherSchemeClass().get_weather_date_scheme
global.Client = require('../dist/lib/ClientLib')
const userDateScheme = new Client.ui.user_date_scheme()

describe('compare dates', () => {
    it('compare dates of same format', done => {
        const result = compareAsc(
            new Date(1987, 1, 11),
            new Date(1989, 6, 10)
          )
        expect(result).toBe(-1)
        done()
    })    

    it('compare dates of different format', done => {
        console.log("user date scheme", userDateScheme)
        const dateA_from_user = "31/01/2021"
        const dateB_from_weatherbitApi = "2021-01-27"
        let res = compareAsc(parse(dateA_from_user, userDateScheme, new Date()), parse(dateB_from_weatherbitApi, weatherDateScheme, new Date()))
        expect(res).toBe(1)

        res = compareAsc(parse(dateB_from_weatherbitApi, weatherDateScheme, new Date()), parse(dateA_from_user, userDateScheme, new Date()))
        expect(res).toBe(-1)

        const dateC_from_weatherbitApi = "2021-01-31"
        res = compareAsc(parse(dateC_from_weatherbitApi, weatherDateScheme, new Date()), parse(dateA_from_user, userDateScheme, new Date()))
        expect(res).toBe(0)
        done()
    })    

})