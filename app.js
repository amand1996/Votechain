var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var jwt = require('jsonwebtoken');

var app = express();
app.jwt = jwt;
app.jwtSecret = 'votechain';

app.use(require(__dirname + '/middleware.js').makeAuthHappen().unless({
	path: ['/']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**************************************MongoDB Database***************************************/
var mongoURI = 'mongodb://votechain:votechain@ds127589.mlab.com:27589/votechain';

app.db = mongoose.createConnection(mongoURI);

app.db.on('error', console.error.bind(console, 'mongoose connection error: '));

app.db.once('open', function () {
  console.log("Connected to ", mongoURI);
});

var voterSchema = mongoose.Schema({
  name: String,
  aadhaar: String,
  image: Buffer,
  hasVoted: Boolean,
  isValid: Boolean,
  constituency: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var adminSchema = mongoose.Schema({
  login_id: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var Voter = app.db.model('Voter', voterSchema);
var Admin = app.db.model('Admin', adminSchema);

/**************************************MongoDB Database***************************************/
module.exports = app;