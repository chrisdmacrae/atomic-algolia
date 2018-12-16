module.exports = async function getRemoteIndex(index) {
    var oldIndex 
    try {
        oldIndex = await query(index)
    } catch (err) {
        throw err
    }

    return oldIndex
}

function query(index) {
    return new Promise(function(resolve, reject) { 
        index.browse("", {}, function browseDone(err, content, hits) {
            if (err) reject(err);

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