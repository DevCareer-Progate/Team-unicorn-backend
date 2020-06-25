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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, firstName, lastName, email, username, password, isAdmin, userExist, newUser, salts, hash, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, username = _req$body.username, password = _req$body.password, isAdmin = _req$body.isAdmin;

                if (!(!firstName || !lastName || !email || !username || !password || !isAdmin)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Please enter all fields'
                }));

              case 4:
                _context.next = 6;
                return _user["default"].findOne({
                  email: email
                });

              case 6:
                userExist = _context.sent;

                if (!userExist) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.json({
                  status: 400,
                  message: 'User already exists'
                }));

              case 9:
                newUser = new _user["default"]({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  username: username,
                  password: password,
                  isAdmin: isAdmin
                });
                _context.next = 12;
                return _bcrypt["default"].genSalt(10);

              case 12:
                salts = _context.sent;
                _context.next = 15;
                return _bcrypt["default"].hash(newUser.password, salts);

              case 15:
                hash = _context.sent;
                newUser.password = hash;
                _context.next = 19;
                return newUser.save();

              case 19:
                user = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  id: user.id
                }, process.env.JWT_SECRET, {
                  expiresIn: 3600
                });
                res.json({
                  status: 200,
                  data: {
                    token: token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    password: user.password
                  }
                });
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](0);
                res.json({
                  status: 'failed',
                  message: _context.t0
                });

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 24]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, user, IsMatch, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _user["default"].findOne({
                  email: email
                });

              case 4:
                user = _context2.sent;
                if (!user) res.json({
                  status: 400,
                  message: 'User does not exist'
                });
                _context2.next = 8;
                return _bcrypt["default"].compare(password, user.password);

              case 8:
                IsMatch = _context2.sent;

                if (IsMatch) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  status: 403,
                  message: 'Incorrect username or password, please review details and try again'
                }));

              case 11:
                token = _jsonwebtoken["default"].sign({
                  email: user.email,
                  id: user.id
                }, process.env.JWT_SECRET, {
                  expiresIn: 3600
                });
                res.json({
                  status: 200,
                  data: {
                    id: user.id,
                    token: token,
                    message: 'User Logged in Sucessfully'
                  }
                });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                res.json({
                  status: 'failed',
                  message: _context2.t0
                });

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }() // signIn(req, res) {
    //     const signIn = (req, res, next) => {
    //         const { email, password } = req.body;
    //         User.findOne({ email })
    //             .then(user => {
    //                 if (!user) {
    //                     return res.json({ status: 404, message: 'User not found, please provide valid credentials' });
    //                 }
    //                 bcrypt.compare(password, user.password)
    //                     .then(valid => {
    //                         if (!valid) {
    //                             return res.json({ status: 403, message: 'Incorrect username or password, please review details and try again' });
    //                         }
    //                         const token = jwt.sign(
    //                             { email: user.email, id: user.id },
    //                             process.env.JWT_SECRET,
    //                             { expiresIn: 3600 }
    //                         );
    //                         res.json({
    //                             status: 200,
    //                             data: {
    //                                 id: user.id,
    //                                 token,
    //                                 message: 'User Logged in Sucessfully'
    //                             }
    //                         });
    //                     });
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }

  }]);

  return UserController;
}();

var _default = new UserController();

exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map