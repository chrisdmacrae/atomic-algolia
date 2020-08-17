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
        let hits = []; 
        index.browse("", {}, function browseDone(err, content) {
            if (err) return reject(err);

            content.hits.forEach(function(hit) {
                hit.objectID = String(hit.objectID)
                hits.push(hit)
            })

            if (content.cursor) {
                index.browseFrom(content.cursor, browseDone);
            } else {
                resolve(hits)
            }
        })
    })
}