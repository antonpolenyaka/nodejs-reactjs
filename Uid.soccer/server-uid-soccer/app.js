"use strict";

let createError = require('http-errors');
let express = require('express');
let path = require('path'); // Library for manipulate path directories and files
let cookieParser = require('cookie-parser');
let logger = require('morgan'); // Library for log detailed of GET, POST, etc.
let cors = require('cors'); // If Reason: CORS header ‘Access-Control-Allow-Origin’ missing

// Routes
let indexRouter = require('./routes/index');
let uidRouter = require('./routes/v1/uid');
let loginRouter = require('./routes/v1/login');

// Express module to use
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Use of routes
app.use('/', indexRouter);
app.use('/v1/uid', uidRouter);
app.use('/v1/login', loginRouter);

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
  res.json({ok: false, message: 'error'}); // response with error without render and views
});

module.exports = app;
