module.exports = function createAction(hit, indexName) {
    return {
        action: "addObject",
        indexName: indexName,
        body: hit
    }
}