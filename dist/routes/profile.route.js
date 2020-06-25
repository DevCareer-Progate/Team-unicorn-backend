"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _profile = _interopRequireDefault(require("../controllers/profile.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

//Handle get request for a single user profile details
router.post('/api/v1/profile/', _profile["default"].createProfile);
router.get('/api/v1/profile/:id', _profile["default"].getProfile);
router["delete"]('/api/v1/profile/:id', _profile["default"].deleteProfile);
router.patch('/api/v1/profile/:id', _profile["default"].updateProfile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=profile.route.js.map