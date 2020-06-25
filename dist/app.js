"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _profile = _interopRequireDefault(require("./routes/profile.route"));

var _gif = _interopRequireDefault(require("./routes/gif.route"));

var _articles = _interopRequireDefault(require("./routes/articles.route"));

var _comment = _interopRequireDefault(require("./routes/comment.route"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var swaggerDefinition = {
  info: {
    title: 'REST API for my twitter clone Web app',
    version: '1.0.0',
    description: 'This is the REST API for my product'
  },
  host: 'localhost:5000',
  basePath: '/api'
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./docs/*.yaml']
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(options);

_dotenv["default"].config();

app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
var db = process.env.DATABASE_URI;

_mongoose["default"].connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(function () {
  return console.log('MongoDB connected successfully');
})["catch"](function (err) {
  return console.log(err);
}); // entry index enpoints


app.get('/', function (req, res) {
  res.json({
    status: 'success',
    message: 'This is the index page endpoint'
  }).status(200);
});
app.use('/', _user["default"]);
app.use('/', _profile["default"]);
app.use('/', _gif["default"]);
app.use('/', _articles["default"]);
app.use('/', _comment["default"]);
var PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
  console.log("The server is listen on PORT ".concat(PORT));
});
//# sourceMappingURL=app.js.map