"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

require("source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idsFromIndex = require("./idsFromIndex");
var md5 = require("md5");

module.exports = function calculateOperations(newIndex, oldIndex) {
    var newIndexIds = [];
    var oldIndexIds = [];

    if (Array.isArray(newIndex)) {
        newIndexIds = idsFromIndex(newIndex);
    }

    if (Array.isArray(oldIndex)) {
        oldIndexIds = idsFromIndex(oldIndex);
    }

    var existingHits = [];
    var operations = { ignore: [], update: [], add: newIndexIds, delete: oldIndexIds };

    if (newIndexIds.length > 0 && oldIndexIds.length > 0) {
        existingHits = findExistingHits(newIndexIds, oldIndexIds);
        operations.add = findNewHits(newIndexIds, oldIndexIds);
        operations.delete = findExpiredHits(newIndexIds, oldIndexIds);
    }

    if (existingHits.length > 0) {
        operations.ignore = findUnchangedHits(existingHits, newIndex, oldIndex);
        operations.update = findChangedHits(existingHits, newIndex, oldIndex);
    }

    return operations;
};

function findNewHits(newIndexIds, oldIndexIds) {
    return newIndexIds.filter(function (id) {
        return oldIndexIds.indexOf(id) === -1;
    });
}

function findExpiredHits(newIndexIds, oldIndexIds) {
    return oldIndexIds.filter(function (id) {
        return newIndexIds.indexOf(id) === -1;
    });
}

function findExistingHits(newIndexIds, oldIndexIds) {
    return newIndexIds.filter(function (id) {
        return oldIndexIds.indexOf(id) !== -1;
    });
}

function findUnchangedHits(existingHits, newIndex, oldIndex) {
    return existingHits.filter(function (id) {
        var shouldUpdate = compareHitFromIndexes(id, newIndex, oldIndex);

        if (shouldUpdate !== true) {
            return id;
        }
    });
}

function findChangedHits(existingHits, newIndex, oldIndex) {
    return existingHits.filter(function (id) {
        var shouldUpdate = compareHitFromIndexes(id, newIndex, oldIndex);

        if (shouldUpdate === true) {
            return id;
        }
    });
}

function compareHitFromIndexes(id, newIndex, oldIndex) {
    var newHit = newIndex.filter(function (hit) {
        return hit.objectID === id;
    });

    var oldHit = oldIndex.filter(function (hit) {
        return String(hit.objectID) === String(id);
    });

    if (newHit.length > 0 && oldHit.length > 0) {
        var newHitSorted = (0, _stringify2.default)(newHit[0], (0, _keys2.default)(newHit[0]).sort());
        var oldHitSorted = (0, _stringify2.default)(oldHit[0], (0, _keys2.default)(oldHit[0]).sort());
        var newHash = md5(newHitSorted);
        var oldHash = md5(oldHitSorted);

        return newHash !== oldHash;
    }

    return null;
}