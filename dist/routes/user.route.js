"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/auth/signup', _user["default"].signUp);
router.post('/api/v1/auth/signin', _user["default"].signIn);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.route.js.map