"use strict";

var actionAdd = require("./utils/actionAdd");

var actionUpdate = require("./utils/actionUpdate");

var actionDelete = require("./utils/actionDelete");

var algoliaSearch = require("algoliasearch");

var chalk = require("chalk");

var dotenv = require("dotenv").config();

var fs = require("fs");

var getLocalIndex = require("./utils/getLocalIndex");

var getRemoteIndex = require("./utils/getRemoteIndex");

var calculateOperations = require("./utils/calculateOperations");

var title = "[" + chalk.blue("Algolia") + "]";

module.exports = function update(indexName, indexData, options, cb) {
  try {
    if (!indexName) throw new Error("Please provide `indexName`");
    if (!indexData) throw new Error("Please provide `indexData`. A valid Javacript object or path to a JSON file.");

    if (typeof options === "function" && typeof cb !== "function") {
      cb = options;
    }

    var client = algoliaSearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(indexName);
    var newIndex = getLocalIndex(indexData);
    return getRemoteIndex(index).then(function (oldIndex) {
      // Figure out which records to add or delete
      var operations = calculateOperations(newIndex, oldIndex);

      if (options.verbose === true) {
        console.log(title, "Adding ".concat(operations.add.length, " hits to ").concat(indexName));
        console.log(title, "Updating ".concat(operations.update.length, " hits to ").concat(indexName));
        console.log(title, "Removing ".concat(operations.delete.length, " hits from ").concat(indexName));
        console.log(title, "".concat(operations.ignore.length, " hits unchanged in ").concat(indexName));
      } // Fetch full records from operation ids


      var toAddRecords = newIndex.filter(function (hit) {
        return operations.add.indexOf(hit.objectID) !== -1;
      });
      var toUpdateRecords = newIndex.filter(function (hit) {
        return operations.update.indexOf(hit.objectID) !== -1;
      }); // Create batch update actions

      var toAdd = toAddRecords.map(function (record) {
        return actionAdd(record, indexName);
      });
      var toUpdate = toUpdateRecords.map(function (record) {
        return actionUpdate(record, indexName);
      });
      var toDelete = operations.delete.map(function (id) {
        return actionDelete(id, indexName);
      });
      var batchActions = [].concat(toAdd, toUpdate, toDelete); // Perform the batch API call

      if (batchActions.length > 0) {
        // Notify client this is coming from this script
        client.setExtraHeader("X-FORWARDED-BY", "ATOMIC-ALGOLIA");
        client.batch(batchActions, function (err, res) {
          if (err) throw err;
          cb(null, res);
        });
      } else {
        cb(null, {});
      }
    }).catch(function (err) {
      cb(err);
    });
  } catch (err) {
    cb(err);
  }
};