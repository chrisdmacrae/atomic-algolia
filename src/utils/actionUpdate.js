module.exports = function updateAction(hit, indexName) {
    return {
        action: "updateObject",
        indexName: indexName,
        body: hit
    }
}