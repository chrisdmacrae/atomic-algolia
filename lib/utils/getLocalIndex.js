"use strict";

var fs = require("fs");

var path = require("path");

module.exports = function getLocalIndex(indexData) {
  if (typeof indexData === "string") {
    return getIndexFromFile(indexData);
  } else {
    return indexData;
  }
};

function getIndexFromFile(filePath) {
  var indexPath = path.resolve(filePath);
  var fileContents = fs.readFileSync(indexPath, "utf-8");

  if (fileContents !== null && fileContents !== undefined) {
    return JSON.parse(fileContents);
  } else {
    return [];
  }
}