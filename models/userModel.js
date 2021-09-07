const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

// Basic mongoose schema withou password and name - not neccessary, added below
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // není validace
  }
})

// adding plugin  passport-local-mongoose checks uniqueness of user names, adds data field user and password
UserSchema.plugin(passportLocalMongoose)

// export modulu
module.exports = mongoose.model('User', UserSchema)