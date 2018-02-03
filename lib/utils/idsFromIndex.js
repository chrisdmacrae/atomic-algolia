module.exports = function idsFromIndex(index) {
  return index.reduce(function(hits, hit) {
      if (hit !== null && hit !== undefined) {
        return hits.concat(hit)
      }
  }, []).reduce(function(hits, hit) {
    if (hit.objectID !== null && hit.objectID !== undefined) {
        var id = String(hit.objectID)
        return hits.concat(id)
    }
  }, []).sort()
}