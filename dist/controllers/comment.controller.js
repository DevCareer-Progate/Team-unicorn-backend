"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _comment = _interopRequireDefault(require("../models/comment.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var commentController = /*#__PURE__*/function () {
  function commentController() {
    _classCallCheck(this, commentController);
  }

  _createClass(commentController, [{
    key: "createComment",
    value: function createComment(req, res) {
      var comment = req.body.comment;

      if (!comment) {
        return res.json({
          message: 'Please fill in the correct field'
        });
      }

      var newComment = new _comment["default"]({
        comment: comment
      });
      newComment.save().then(function (com) {
        res.json({
          status: 'success',
          data: {
            message: 'comment successfully created',
            comment: com.comment
          }
        });
      })["catch"](function (err) {
        if (err) throw err;
      });
    }
  }]);

  return commentController;
}();

var _default = new commentController();

exports["default"] = _default;
//# sourceMappingURL=comment.controller.js.map