"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config(); // Get user profile details


var ProfileController = /*#__PURE__*/function () {
  function ProfileController() {
    _classCallCheck(this, ProfileController);
  }

  _createClass(ProfileController, [{
    key: "createProfile",
    value: function createProfile(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          isAdmin = _req$body.isAdmin,
          country = _req$body.country,
          state = _req$body.state,
          city = _req$body.city,
          address = _req$body.address,
          image = _req$body.image,
          created_on = _req$body.created_on;

      if (!firstName || !lastName || !isAdmin || !country || !state || !city || !address || !image || !created_on) {
        return res.status(400).json({
          message: 'Please enter all fields'
        });
      }

      var newProfile = new _user["default"]({
        firstName: firstName,
        lastName: lastName,
        isAdmin: isAdmin,
        country: country,
        state: state,
        city: city,
        address: address,
        image: image,
        created_on: created_on
      });
      newProfile.save().then(function (profile) {
        _jsonwebtoken["default"].sign({
          _id: profile.id
        }, process.env.JWT_SECRET, {
          expiresIn: 3600
        }, function (err, token) {
          if (err) throw err;
          res.json({
            token: token,
            id: newProfile.id,
            firstName: newProfile.firstName,
            lastName: newProfile.lastName,
            address: newProfile.address,
            state: newProfile.state
          });
        });
      });
    }
  }, {
    key: "getProfile",
    value: function getProfile(req, res, next) {
      _user["default"].findById(req.params.id).select('firstname lastname username email _id').then(function (result) {
        res.status(200).json({
          status: 200,
          message: 'success',
          data: result,
          request: {
            type: "GET",
            url: "http://".concat(req.headers.host, "/api/v1/auth/profile/:").concat(id)
          }
        });
      })["catch"](function (err) {
        console.log(err);
        res.status(400).json({
          status: 400,
          message: 'An error ocuur',
          error: err
        });
      });

      next();
    }
  }, {
    key: "getProfiles",
    value: function getProfiles(req, res, next) {
      _user["default"].find({}).then(function (err, foundObject) {
        if (err) return res.json({
          status: 400,
          message: 'There is an error'
        });
        res.json({
          status: 200,
          data: foundObject
        });
      })["catch"](function (err) {
        return res.json({
          status: 404,
          data: err
        });
      });

      next();
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(req, res, next) {
      var _req$body2 = req.body,
          firstName = _req$body2.firstName,
          lastName = _req$body2.lastName,
          isAdmin = _req$body2.isAdmin,
          country = _req$body2.country,
          state = _req$body2.state,
          city = _req$body2.city,
          address = _req$body2.address,
          image = _req$body2.image;

      _user["default"].findById(req.params.id).then(function (profile) {
        if (!profile) {
          return res.status(403).json({
            status: 403,
            message: "User not found!"
          });
        } else {
          _user["default"].findByIdAndUpdate({
            _id: req.params.id
          }, req.body).then(function () {
            res.status(200).json({
              status: 200,
              data: {
                '_id': req.params.id,
                'firstName': req.body.firstName || profile.firstName,
                'lastName': req.body.lastName || profile.lastName,
                'country': req.body.country || profile.country,
                'state': req.body.state || profile.state,
                'city': req.body.city || profile.city,
                'address': req.body.address || profile.address,
                'image': req.body.image || profile.image,
                'created_on': profile.created_on
              }
            });
          });
        }
      })["catch"](function (err) {
        return res.status(404).json({
          status: 404,
          message: "An error occurred"
        });
      });

      next();
    }
  }, {
    key: "deleteProfile",
    value: function deleteProfile(req, res, next) {
      _user["default"].findOneAndRemove({
        _id: req.parmas.id
      }).then(function (err) {
        if (err) return res.json({
          status: 400,
          message: 'No user with the specified Id'
        });
        res.json({
          status: 200,
          message: 'The profile is deleted successfully'
        });
      })["catch"](function (err) {
        return res.json({
          status: 404,
          message: 'No profile found!'
        });
      });

      next();
    }
  }]);

  return ProfileController;
}();

var _default = new ProfileController();

exports["default"] = _default;
//# sourceMappingURL=profile.controller.js.map