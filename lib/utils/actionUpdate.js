"use strict";

require("source-map-support/register");

module.exports = function updateAction(hit, indexName) {
    return {
        action: "updateObject",
        indexName: indexName,
        body: hit
    };
};