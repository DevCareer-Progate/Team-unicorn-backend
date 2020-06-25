"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articles = _interopRequireDefault(require("../models/articles.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var articleController = /*#__PURE__*/function () {
  function articleController() {
    _classCallCheck(this, articleController);
  }

  _createClass(articleController, [{
    key: "createArticle",
    value: function createArticle(req, res) {
      var _req$body = req.body,
          articleId = _req$body.articleId,
          title = _req$body.title,
          article = _req$body.article;

      if (!articleId || !title || !article) {
        res.json({
          message: 'Please fill the required field appropriately'
        }).status(400);
      }

      var newArticle = new _articles["default"]({
        articleId: articleId,
        title: title,
        article: article
      });
      newArticle.save(function (art) {
        res.json({
          status: 'success',
          data: {
            message: 'Article successfully posted',
            articleId: art.articleId,
            createdOn: Date.now,
            title: art.title
          }
        });
      })["catch"](function (err) {
        res.json({
          status: 'unsuccessful',
          message: 'The article can not be posted',
          err: err
        });
      });
    }
  }, {
    key: "updateArticle",
    value: function updateArticle(req, res) {
      _articles["default"].findOneAndUpdate(req.params.id, req.body, {
        "new": true,
        runValidators: true
      }).then(function (art) {
        if (!art) {
          return res.json({
            message: 'There is no Id with specific user'
          }).status(400);
        }

        res.json({
          status: 'success',
          data: {
            message: 'Article successfully updated',
            title: art.title,
            article: art.article
          }
        })["catch"](function (err) {
          res.json({
            status: 'Failed',
            data: {
              message: 'Article can not be updated',
              err: err
            }
          });
        });
      });
    }
  }, {
    key: "deleteArticle",
    value: function deleteArticle(req, res) {
      var _id = req.params.id;

      _articles["default"].findByIdAndRemove(_id).then(function (article) {
        if (!article) {
          return res.json({
            message: 'There is no user with the Id'
          });
        }

        res.json({
          status: 'success',
          data: {
            messgae: 'Article successfully deleted'
          }
        });
      });
    }
  }]);

  return articleController;
}();

var _default = new articleController();

exports["default"] = _default;
//# sourceMappingURL=articles.controller.js.map