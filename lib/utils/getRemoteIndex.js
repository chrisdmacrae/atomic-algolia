"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require("source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(index) {
        var oldIndex;
        return _regenerator2.default.wrap(function _callee$(_context) {
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
        return _ref.apply(this, arguments);
    }

    return getRemoteIndex;
}();

function query(index) {
    return new _promise2.default(function (resolve) {
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