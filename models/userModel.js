'use strict';

const mongoose = require('mongoose')
  , passportLocalMongoose = require('passport-local-mongoose')
  , Schema = mongoose.Schema

// Basic mongoose schema withou password and name - not neccessary, added below
const UserSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: [
      'Admin',
      'Normal'
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true, // not validation
  }
})

// Adding plugin  passport-local-mongoose checks uniqueness of user names, adds data field user and password
UserSchema.plugin(passportLocalMongoose)

// Export of the model
module.exports = mongoose.model('User', UserSchema)