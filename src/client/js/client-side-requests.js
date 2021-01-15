export function setFetch(fetch) {
    global.fetch = fetch
}

export function getFetch() {
    return global.fetch
}
