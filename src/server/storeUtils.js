const { maxHeaderSize } = require("http");

class StoreUtils {
    constructor(store) {
        this.store = store
    }
    append = function (object) {
        const newId = this.generateId()
        const newObject = object;
        newObject['id'] = newId;
        console.log("newobject", newObject)
        this.store(newId, newObject)
        console.log("all", this.store())
        return newObject
    }

    generateId = function () {
        //find the biggest key in this.store, return the next value
        const arrayKeys = this.store.keys();
        console.log("arrayKeys", arrayKeys)
        if (arrayKeys.length == 0) {
            return 0;
        }
        
        let maxValue = Math.max(...arrayKeys)        
        console.log("maxValue", maxValue)
        return maxValue + 1
    }
}

module.exports = StoreUtils
