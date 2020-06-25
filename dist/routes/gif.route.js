"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _git = _interopRequireDefault(require("../controllers/git.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/gif', _git["default"].createGif);
router["delete"]('/:id', _git["default"].deleteGif);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=gif.route.js.map