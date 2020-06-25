"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articles = _interopRequireDefault(require("../controllers/articles.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/artilces', _articles["default"].createArticle);
router["delete"]('/:id', _articles["default"].deleteArticle);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=articles.route.js.map