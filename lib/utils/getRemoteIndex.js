"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports =
/*#__PURE__*/
function () {
  var _getRemoteIndex = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(index) {
    var oldIndex;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return query(index);

          case 3:
            oldIndex = _context.sent;
            _context.next = 8;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

          case 8:
            return _context.abrupt("return", oldIndex);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  function getRemoteIndex(_x) {
    return _getRemoteIndex.apply(this, arguments);
  }

  return getRemoteIndex;
}();

function query(index) {
  return new Promise(function (resolve) {
    index.browse("", {}, function browseDone(err, content, hits) {
      if (err) throw err;

      if (!Array.isArray(hits)) {
        hits = [];
      }

      content.hits.forEach(function (hit) {
        hit.objectID = String(hit.objectID);
        hits.push(hit);
      });

      if (content.cursor) {
        resolve(index.browseFrom(content.cursor, browseDone, hits));
      } else {
        resolve(hits);
      }
    });
  });
}