const { maxHeaderSize } = require("http");

class StoreUtils {
    constructor(store) {
        this.store = store
    }
    append = function (object) {
        const newId = this.generateId()
        const newObject = object;
        newObject['id'] = newId;
        this.store(newId, newObject)
        return newObject
    }

    generateId = function () {
        //find the biggest key in this.store, return the next value
        const arrayKeys = this.store.keys();
        if (arrayKeys.length == 0) {
            return 0;
        }
        
        let maxValue = Math.max(...arrayKeys)       
        return maxValue + 1
    }
}

module.exports = StoreUtils
