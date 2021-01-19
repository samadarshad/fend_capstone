class StoreUtils {
    constructor(store) {
        this.store = store
    }
    append = function (object) {
        const newId = this.generateId()
        this.store(newId, object)
        return this.store(newId)
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
