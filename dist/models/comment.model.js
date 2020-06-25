"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var commentSchema = new Schema({
  comment: {
    type: String
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
});

var comment = _mongoose["default"].model('comment', commentSchema);

var _default = comment;
exports["default"] = _default;
//# sourceMappingURL=comment.model.js.map