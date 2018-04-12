#!/usr/bin/env node
var dotenv = require("dotenv").config()
var update = require("./update")

if (require.main === module) {
    var index = process.env.ALGOLIA_INDEX_NAME
    var indexFile = process.env.ALGOLIA_INDEX_FILE

    if (!index)
        throw new Error("Please provide `process.env.ALGOLIA_INDEX_NAME`")
        
    if (!indexFile)
        throw new Error("Please provide `process.env.ALGOLIA_INDEX_FILE`")

    update(index, indexFile, {verbose: true}, function(err, result) {
        if (err) throw err

        console.log(result)
    })
} else {
    module.exports = update
}
