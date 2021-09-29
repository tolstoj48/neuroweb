'use strict';

const mongoose = require('mongoose')
  , User = require('../models/userModel')
  // Db url
  , dbUrl = 'mongodb://localhost:27017/neuroweb'
  // Credentials
  , { credentials } = require('../config')

// New user account
async function createNewUser() {
  try {
    const email = 'a@g.com'
    , username = 'alena_10'
    , role = 'Admin'
    , user = new User({ role, email, username })
    await User.register(user, credentials.newUserPassword);
  } catch (err) {
    console.log(err.message)
  }
}

// Connection to db
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 3000,
})
  .then(() => {
    // Not in the test env
    if (process.env.NODE_ENV !== 'test') console.log('Mongo DB connection open!');
    createNewUser();
  })
  .catch(err => {
    console.log('Mongo DB error of connection')
    console.log(err)
  })