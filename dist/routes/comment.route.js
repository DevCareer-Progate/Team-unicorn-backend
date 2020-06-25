"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _comment = _interopRequireDefault(require("../controllers/comment.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/articles/:id/comment', _comment["default"].createComment);
router.post('/gifs/:id/comment', _comment["default"].createComment);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=comment.route.js.map