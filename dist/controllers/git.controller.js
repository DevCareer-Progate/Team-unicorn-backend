"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _gif = _interopRequireDefault(require("../models/gif.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var gifController = /*#__PURE__*/function () {
  function gifController() {
    _classCallCheck(this, gifController);
  }

  _createClass(gifController, [{
    key: "createGif",
    value: function createGif(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          title = _req$body.title,
          image = _req$body.image;

      if (!userId || !title || !image) {
        return res.status(400).json({
          message: 'Please fill the required field'
        });
      }

      var newGif = new _gif["default"]({
        title: title,
        image: image
      });
      newGif.save().then(function (gif) {
        res.json({
          status: 'success',
          data: {
            gifId: gif.userId,
            message: 'GIF image successfully posted',
            createdOn: Date.now,
            title: gif.title,
            image: gif.image
          }
        });
      });
    }
  }, {
    key: "deleteGif",
    value: function deleteGif(req, res) {
      var _id = req.params.id;

      _gif["default"].findOneAndRemove(_id).then(function (gif) {
        if (!gif) {
          return res.json({
            message: 'There is no gif with the Id'
          });
        }

        res.json({
          status: 'success',
          data: {
            message: 'gif post successfully deleted'
          }
        });
      })["catch"](function (err) {
        res.json({
          status: 'Failed',
          data: {
            message: 'gif can not be deleted',
            err: err
          }
        });
      });
    }
  }]);

  return gifController;
}();

var _default = new gifController();

exports["default"] = _default;
//# sourceMappingURL=git.controller.js.map