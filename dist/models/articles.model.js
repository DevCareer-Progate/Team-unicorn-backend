"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var articleSchema = new Schema({
  articleId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

var article = _mongoose["default"].model('article', articleSchema);

var _default = article;
exports["default"] = _default;
//# sourceMappingURL=articles.model.js.map