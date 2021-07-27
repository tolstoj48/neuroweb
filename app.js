// testovat základní funkčnost - ui, validaci, schema
// secret do zvláštního souboru

//pro začátek provést propojení do mongodb a zkusit rychlost, jak to bude běhat...
// testy
// spouštění, aby nepadalo
// vazba na postgresql
// přihlašování
// loga 2. LF
// favicon
// struktura dle zadání
// ngs comments - vytvočit, editovat, smazat pro admina - nějaký zašoupávátka



// web je dnalab.cz

// mozzila/chrome

// validace, pretifikace, správně váýznamnově html

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
const taskRouter = require('./routes/taskRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

const engine = require("ejs-mate");

//mongo sanitize SQL
const sanitize = require("express-mongo-sanitize");

// session setup
const session = require("express-session");
// flash
const flash = require("connect-flash");
// mongodb pro sessions
const MongoDBStore = require("connect-mongo");
// db url
const dbUrl = "mongodb://localhost:27017/neuroweb";


// protection against sql injection
app.use(sanitize());

// method override pro metody jiné než post a get
const methodOverride = require("method-override")
// mongoose knihovna pro mongo db
const mongoose = require("mongoose");


// připojení k db jménem test a v promisu pak ověření, že došlo k připojení k db
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // nutné kůli importu velkých objemů dat - třeba 50000 - v milisekundách
  connectTimeoutMS: 3000,
})
  .then(() => {
    // ne v testovacím prostředí
    if (process.env.NODE_ENV !== "test") console.log("Mongo DB connection open!")
  })
  .catch(err => {
    console.log("Mongo DB error of connection")
    console.log(err)
  })

// mongo pro session setup
const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret: "thisIsSecret",
  // pokud se nezmění data, není nutné je updateovat session
  touchAfter: 24 * 60 * 60, // v sekundách
})

store.on("error", function (e) {
  console.log("Session store error")
})


//session setup
const sessionOptions = {
  store,
  // doporučuje se, aby se hůře odhadovalo změnit si name cookie
  name: "neurowebSessJmeno",
  secret: "thisIsAnotherSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // cookies jen přes http a ne pomocí JS
    httpOnly: true,
    // cookies přes https
    //secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}


// esj engine
app.engine("ejs", engine);
// import ejs
app.set("view engine", "ejs");
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// directory with bootstrap
app.use('/assets/vendor/bootstrap', express.static(
  path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
// directory with jquery for bootstrap
app.use('/assets/vendor/jquery', express.static(
  path.join(__dirname, 'node_modules', 'jquery', 'dist')));
// directory with js for bootstrap
app.use('/assets/vendor/popper.js', express.static(
  path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
// directory with icons
app.use('/assets/vendor/feather-icons', express.static(
  path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));

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


// use session setup
app.use(session(sessionOptions));

// užít method override
app.use(methodOverride("_method"));

// flash use
app.use(flash())

// ukládání proměnných dostupných v každém res.locals objektu pro vyzužití
app.use((req, res, next) => {
  // dostupné díky passportu - jméno a mail uživatele po přihlášení, na každém requestu a díky tomuto i pro template
  //res.locals.currentUser = req.user
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

app.use(cookieParser());

// || Routery
app.use('/', indexRouter);
app.use('/tasks/', taskRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Stránka nebyla nalezena!'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    layout: 'index',
    title: 'NGL - Error',
  });
});

module.exports = app;
