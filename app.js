require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('express-flash-messages');

var indexRouter = require('./routes/index');
var ratingsRouter = require('./routes/ratings');
var submitRouter = require('./routes/submit');

var SESSION_SECRET = process.env.SESSION_SECRET

var app = express(); // app initialization

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000},
  secret: SESSION_SECRET,
  name: 'course-ratings-app-session',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ratings', ratingsRouter);
app.use('/submit', submitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
