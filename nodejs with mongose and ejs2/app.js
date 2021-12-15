var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Connection to Database
require('./lib/connectMongoose');
require('./models/Agente');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiv1/agentes', require('./routes/apiv1/agentes')); // test con http://localhost:3000/apiv1/agentes

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
  if(isAPI(req)) {
    console.log(req.originalUrl);
    res.json({ok: false, error: err.message});
    return; // para no responder 2 veces
  }
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(3000);

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0; // empieza por '/api'
}

module.exports = app;
