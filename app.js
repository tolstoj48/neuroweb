// spouštění, aby nepadalo
// vazba na postgresql
// přihlašování


// instalace node.js do ubuntu: https://github.com/nodesource/distributions/blob/master/README.md
// postgresql by mělo být na každém ubuntu
// vkládání dat do db pomocí: https://stackoverflow.com/questions/2987433/how-to-import-csv-file-data-into-a-postgresql-table

'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream');

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');

const handlebars = require('express-handlebars');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
}));

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// logování s rotací souborů
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
  stream: process.env.REQUEST_LOG_FILE ?
  rfs.createStream(process.env.REQUEST_LOG_FILE, {
  size: '10M', // rotate every 10M written
  interval: '7d', // rotate weekly
  path: 'log' // path to log files
  })
: process.stdout
}));

// || Routery
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
