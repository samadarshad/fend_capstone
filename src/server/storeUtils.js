class StoreUtils {

    constructor(store) {
        this.store = store
        this.store_counter = 0;
    }
    append = function (object) {
        const newId = this.generateId()
        this.store(newId, object)
        return this.store(newId)
    }

    generateId = function () {
        return this.store_counter++
    }

    reset = function () {
        this.store(false)
        this.store_counter = 0
    }

}

module.exports = StoreUtils
