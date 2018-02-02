module.exports = function idsFromQuery(index, cb) {
    index.browse("", {attributesToRetrieve: ["objectID"]}, function browseDone(err, content, ids) {
        if (err) cb(err)

        if (!Array.isArray(ids)) {
            ids = []
        }

        content.hits.forEach(function(hit) {
            ids.push(hit.objectID)
        })
    
        if (content.cursor) {
            index.browseFrom(content.cursor, browseDone, ids)
        } else {
            cb(null, ids)
        }
    })
}