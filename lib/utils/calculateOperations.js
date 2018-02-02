module.exports = function calculateOperations(newIndexIds, oldIndexIds) {
    var operations = {unchanged: [], add: newIndexIds, delete: oldIndexIds}

    if (newIndexIds.length > 0 && oldIndexIds.length > 0) {
        operations.unchanged = newIndexIds.filter(function(hit) {
            return oldIndexIds.indexOf(hit) !== -1
        })

        operations.add = newIndexIds.filter(function(hit) {
            return oldIndexIds.indexOf(hit) === -1
        })

        operations.delete = oldIndexIds.filter(function(hit) {
            return newIndexIds.indexOf(hit) === -1
        })
    }

    return operations
}