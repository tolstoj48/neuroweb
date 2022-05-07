'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');

// Passport
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/userModel');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream');

const indexRouter = require('./routes/indexRouter');
const taskRouter = require('./routes/taskRouter');
const commentsRouter = require('./routes/commentsRouter');
const geneRouter = require('./routes/geneRouter');
const userRouter = require('./routes/usersRouter');
const fastqsRouter = require('./routes/fastqsRouter');
const annotationRouter = require('./routes/annotationRouter');

// Analysis data directory watch
const monitorAnalysisDataDir = require('./utilities/monitorAnalysisDataDir');
// Annotated data directory watch
const monitorAnnotatedDataDir = require('./utilities/monitorAnnotatedDataDir');

// Authentication
const { isLoggedIn } = require('./middleware/isLoggedIn');

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
// Db url - always depends on the IP address of mongodb container
const dbUrl = 'mongodb://172.18.0.2:27017/neuroweb';


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
  // Needed to setup for imports of bigger files
  connectTimeoutMS: 3000,
})
  .then(() => {
    // Not in the testing env
    if (process.env.NODE_ENV !== 'test') console.log('Mongo DB connection open!')
  })
  .catch(err => {
    console.log('Mongo DB error of connection')
    console.log(err)
  })

// Mongo for session setup
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
  // Change cookie name is better
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

// Ejs engine
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

// Passport, must be below app.use session, all is needed for presistent login
app.use(passport.initialize())
app.use(passport.session())

// Own strategy - autentikce using User model, authenticate is from the mongoose model
passport.use(new LocalStrategy(User.authenticate()))
// The way we save user in the session
passport.serializeUser(User.serializeUser())
// The way we retriev user from the session
passport.deserializeUser(User.deserializeUser())


// Saving data accessible in all templates
app.use((req, res, next) => {
  // Thanks to passport is accessible name and user mail after login
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.uploadFlag = false;
  next();
})

app.use(cookieParser());

// Tiny MCE editor
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// Routers
app.use('/', indexRouter);
app.use('/tasks/', taskRouter);
app.use('/ngs-com/', commentsRouter);
app.use('/in-house-db/', geneRouter);
app.use('/', userRouter);
app.use('/fastqs/', fastqsRouter);
app.use('/annotation/', annotationRouter);

// Catch 404 and forward to error handler
app.use(isLoggedIn, function (req, res, next) {
  next(createError(404, 'The page hasn´t been found!'));
});

// Error handler
app.use(isLoggedIn, function (err, req, res, next) {
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
