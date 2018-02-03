module.exports = async function getRemoteIndex(index) {
    var oldIndex 
    try {
        oldIndex = await query(index)
    } catch (err) {
        // do something...
    }

    return oldIndex
}

function query(index) {
    return new Promise(function(resolve) { 
        index.browse("", {}, function browseDone(err, content, hits) {
            if (err) throw err

            if (!Array.isArray(hits)) {
                hits = []
            }

            content.hits.forEach(function(hit) {
                hit.objectID = String(hit.objectID)
                hits.push(hit)
            })
        
            if (content.cursor) {
                resolve(index.browseFrom(content.cursor, browseDone, hits))
            } else {
                resolve(hits)
            }
        })
    })
}