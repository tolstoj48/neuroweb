// mazání dat z db tlačítka

// microservice??? - task/comments aspoň ve views svoje složky

//pro začátek provést propojení do mongodb a zkusit rychlost, jak to bude běhat... - // vazba na postgresql
// testy
// spouštění, aby nepadalo
// přihlašování
// schema gene a všechny validace a v db se musí jmenovat tak, jak mi zadala ája, domluvit na oddělovačícch

// struktura dle zadání

// web dnalab.cz

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
const commentsRouter = require('./routes/commentsRouter');
const geneRouter = require('./routes/geneRouter');

// Credentials
const { credentials } = require('./config')

const app = express();

const engine = require('ejs-mate');

// Mongo sanitize SQL
const sanitize = require('express-mongo-sanitize');

// Session setup
const session = require('express-session');
// Flash
const flash = require('connect-flash');
// Mongodb for sessions
const MongoDBStore = require('connect-mongo');
// Db url
const dbUrl = 'mongodb://localhost:27017/neuroweb';



// Protection against sql injection
app.use(sanitize());

// Method override for other methods than post and get
const methodOverride = require('method-override');
// Mongoose for mongoDb
const mongoose = require('mongoose');


// Connection to db
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
    if (process.env.NODE_ENV !== 'test') console.log('Mongo DB connection open!')
  })
  .catch(err => {
    console.log('Mongo DB error of connection')
    console.log(err)
  })

// Mongo pro session setup
const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret: credentials.secretMongoDBStore,
  // If no changes no need to update session
  touchAfter: 24 * 60 * 60, // in seconds
})

store.on('error', function (e) {
  if (e) console.log('Session store error');
})


//Session setup
const sessionOptions = {
  store,
  // Chnage cookie name is better
  name: 'neurowebSessJmeno',
  secret: credentials.secretSession,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Cookies only through http and not in JS
    httpOnly: true,
    // Cookies through https
    //secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}


// Esj engine
app.engine('ejs', engine);
// Import ejs
app.set('view engine', 'ejs');
// View engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Directory with bootstrap
app.use('/assets/vendor/bootstrap', express.static(
  path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
// Directory with jquery for bootstrap
app.use('/assets/vendor/jquery', express.static(
  path.join(__dirname, 'node_modules', 'jquery', 'dist')));
// Directory with js for bootstrap
app.use('/assets/vendor/popper.js', express.static(
  path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
// Directory with icons
app.use('/assets/vendor/feather-icons', express.static(
  path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));

// Logging with file rotation
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
  stream: process.env.REQUEST_LOG_FILE ?
    rfs.createStream(process.env.REQUEST_LOG_FILE, {
      size: '10M', // rotate every 10M written
      interval: '7d', // rotate weekly
      path: 'log' // path to log files
    })
    : process.stdout
}));


// Use session setup
app.use(session(sessionOptions));

// Use method override
app.use(methodOverride('_method'));

// Use flash
app.use(flash())

// Saving data accessible in all templates
app.use((req, res, next) => {
  // Thanks to passport is accessible name and user mail after login
  //res.locals.currentUser = req.user
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.uploadFlag = false;
  next();
})

app.use(cookieParser());

// Tiny MCE editor
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// || Routers
app.use('/', indexRouter);
app.use('/tasks/', taskRouter);
app.use('/ngs-com/', commentsRouter);
app.use('/in-house-db/', geneRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'The page hasn´t been found!'));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    layout: 'index',
    title: 'NGL - Error',
  });
});

module.exports = app;