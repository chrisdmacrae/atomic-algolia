"use strict";

require("source-map-support/register");

module.exports = function deleteAction(id, indexName) {
    return {
        action: "deleteObject",
        indexName: indexName,
        body: {
            objectID: id
        }
    };
};