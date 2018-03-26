"use strict";

require("source-map-support/register");

module.exports = function createAction(hit, indexName) {
    return {
        action: "addObject",
        indexName: indexName,
        body: hit
    };
};