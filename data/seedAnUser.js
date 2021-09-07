'use strict';

const mongoose = require('mongoose')
const User = require('../models/userModel')
// Db url
const dbUrl = 'mongodb://localhost:27017/neuroweb';
// credentials
const { credentials } = require('../config')

// new user account
async function createNewUser(){
  try {
    const email = 'a@g.com'
    const username = 'alena_10'
    const user = new User({ email, username })
    console.log(credentials.newUserPassword);
    await User.register(user, credentials.newUserPassword)
  } catch(err) {
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
    // ne v testovacím prostředí
    if (process.env.NODE_ENV !== 'test') console.log('Mongo DB connection open!');
    createNewUser();
  })
  .catch(err => {
    console.log('Mongo DB error of connection')
    console.log(err)
  })