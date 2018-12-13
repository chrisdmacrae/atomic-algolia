"use strict";

var debug = require('debug')('atomic-algolia:actionAdd');

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

  debug('New Index IDs: %o', newIndexIds);
  debug('Old Index IDs: %o', oldIndexIds);
  var existingHits = [];
  var operations = {
    ignore: [],
    update: [],
    add: newIndexIds,
    delete: oldIndexIds
  };

  if (newIndexIds.length > 0 && oldIndexIds.length > 0) {
    existingHits = findExistingHits(newIndexIds, oldIndexIds);
    operations.add = findNewHits(newIndexIds, oldIndexIds);
    operations.delete = findExpiredHits(newIndexIds, oldIndexIds);
  }

  if (existingHits.length > 0) {
    operations.ignore = findUnchangedHits(existingHits, newIndex, oldIndex);
    operations.update = findChangedHits(existingHits, newIndex, oldIndex);
  }

  debug('Existing Hits: %o', existingHits);
  debug('Add Operations: %o', operations.add);
  debug('Delete Operations: %o', operations.delete);
  debug('Update Operations: %o', operations.update);
  debug('Ignore Operations: %o', operations.ignore);
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
  debug('New hit: %o', newHit);
  debug('Old hit: %o', oldHit);

  if (newHit.length > 0 && oldHit.length > 0) {
    var newHitSorted = JSON.stringify(newHit[0], Object.keys(newHit[0]).sort());
    var oldHitSorted = JSON.stringify(oldHit[0], Object.keys(oldHit[0]).sort());
    var newHash = md5(newHitSorted);
    var oldHash = md5(oldHitSorted);
    debug('Comparing new to old:');
    debug('%o <> %o', newHitSorted, oldHitSorted);
    debug('%s <> %s', newHash, oldHash);
    return newHash !== oldHash;
  }

  return null;
}