import { parseISO, compareAsc, parse } from 'date-fns'

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
        const dateA_from_user = "31/01/2021"
        const dateB_from_weatherbitApi = "2021-01-27"
        let res = compareAsc(parse(dateA_from_user, 'dd/mm/yyyy', new Date()), parse(dateB_from_weatherbitApi, 'yyyy-mm-dd', new Date()))
        expect(res).toBe(1)

        res = compareAsc(parse(dateB_from_weatherbitApi, 'yyyy-mm-dd', new Date()), parse(dateA_from_user, 'dd/mm/yyyy', new Date()))
        expect(res).toBe(-1)

        const dateC_from_weatherbitApi = "2021-01-31"
        res = compareAsc(parse(dateC_from_weatherbitApi, 'yyyy-mm-dd', new Date()), parse(dateA_from_user, 'dd/mm/yyyy', new Date()))
        expect(res).toBe(0)
        done()
    })    

})