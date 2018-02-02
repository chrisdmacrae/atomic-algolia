module.exports = function idsFromIndex(newIndex) {
    return newIndex.reduce(function(hits, hit) {
        if (hit !== null && hit !== undefined) {
          return hits.concat(hit)
        }
    }, []).reduce(function(hits, hit) {
      if (hit.objectID !== null && hit.objectID !== undefined) {
          return hits.concat(hit.objectID)
      }
    }, [])
  }