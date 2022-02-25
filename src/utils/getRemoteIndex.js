module.exports = async function  getRemoteIndex(index) {
  let hits = [];
  await index.browseObjects({
    query: '', // Empty query will match all records
    batch: batch => {
      hits = hits.concat(batch);
    },
    attributesToRetrieve: ["*"]
  })
  return hits
}
