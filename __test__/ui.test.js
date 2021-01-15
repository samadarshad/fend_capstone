import { JSDOM } from "jsdom"
global.Client = require('../dist/ClientLib')

function createDivWithId(document, id) {
    let element = document.createElement('div')
    element.id = id;
    document.body.appendChild(element)
    return element
}

describe('ui', () => {
    it('when update UI then expect DOM to update', async done => {
        const documentMock = new JSDOM().window.document
        const agreement = createDivWithId(documentMock, "agreement");
        const subjectivity = createDivWithId(documentMock, "subjectivity");
        const confidence = createDivWithId(documentMock, "confidence");
        const irony = createDivWithId(documentMock, "irony");
        const results = createDivWithId(documentMock, "results");
        const sentence = createDivWithId(documentMock, "sentence-evaluated");

        const data = {
            agreement: "a",
            subjectivity: "b",
            confidence: "c",
            irony: "d",
            sentence_list: [{
              text: "1234"  
            }]
        }
        await Client.updateUI(data, documentMock)

        expect(agreement.innerHTML).toBe("a")
        expect(subjectivity.innerHTML).toBe("b")
        expect(confidence.innerHTML).toBe("c")
        expect(irony.innerHTML).toBe("d")
        expect(sentence.innerHTML).toBe("1234")
        expect(results.innerHTML).toBe(JSON.stringify(data))
        done()
    })

})