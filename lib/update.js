var algoliaSearch = require("algoliasearch")
var addAction = require("./utils/addAction")
var chalk = require("chalk")
var deleteAction = require("./utils/deleteAction")
var dotenv = require("dotenv").config()
var fs = require("fs")
var idsFromIndex = require("./utils/idsFromIndex")
var idsFromQuery = require("./utils/idsFromQuery")
var calculateOperations = require("./utils/calculateOperations")
var path = require("path")
var title = chalk`[{blue Algolia}]`

module.exports = function update(indexName, indexFile, cb) {
    try {
        if (!indexName)
            throw new Error("Please provide `indexName`")

        if (!indexFile)
            throw new Error("Please provide `indexFile`")

        if (!fs.existsSync(indexFile)) 
            throw new Error("Index file `" + indexFile + "` not found")
            
        var client = algoliaSearch(
            process.env.ALGOLIA_APP_ID,
            process.env.ALGOLIA_ADMIN_KEY
        )

        var verbose = process.env.VERBOSE
        var index = client.initIndex(indexName)
        var newIndex = JSON.parse(fs.readFileSync(path.resolve(indexFile), "utf-8"))
        var newIndexIds = idsFromIndex(newIndex)
        
        idsFromQuery(index, function(err, res) {
            if (err) throw err

            // Figure out which records to add or delete
            var operations = calculateOperations(newIndexIds, res)

            if (verbose === true) {
                console.log(title, `Adding ${operations.add.length} hits to ${indexName}`)
                console.log(title, `Removing ${operations.delete.length} hits from ${indexName}`)
                console.log(title, `${operations.add.length} hits unchanged in ${indexName}`)
            }

            // Fetch full records from operations.add ids
            var toAddRecords = newIndex.filter(function(hit) {
                return operations.add.indexOf(hit.objectID) !== -1
            })

            // Create batch update actions
            var toAdd = toAddRecords.map(function(record) {
                return addAction(record, indexName)
            })

            var toDelete = operations.delete.map(function(id) {
                var action = deleteAction(id, indexName)
                return action
            })
            
            var batchActions = [].concat(toAdd, toDelete)

            // Perform the batch API call
            if (batchActions.length > 0) {
                // Notify client this is coming from this script
                client.setExtraHeader("X-FORWARDED-BY", "HUGO-ALGOLIA")
                client.batch(batchActions, function(err, res) {
                    if (err) throw err

                    cb(null, res)
                })
            }
        })
    } catch (err) {
        cb(err)
    }
}