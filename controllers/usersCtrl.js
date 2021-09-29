'use strict';

const User = require('../models/userModel')

// Register page
module.exports.register = (req, res) => {
  res.render('users/register', {
    layout: 'index',
    title: 'NGL - New user registration page',
  });
}

// New user creation
module.exports.newUser = async (req, res) => {
  try {
    const { email, role, username, password } = req.body
    // Into the db
    const user = new User({ role, email, username })
    // Registration with passport
    await User.register(user, password)
    req.flash('success', 'User has been registered!')
    res.redirect('/')
  } catch (e) {
    console.log("ehere aim")
    req.flash('error', e.message)
    res.redirect('register')
  }
}

// Login view
module.exports.login = (req, res) => {
  res.render('users/login', {
    layout: 'index',
    title: 'NGL - Login page',
  });
}

// Passport middleware for local authentication - hashes password and compares to the db
module.exports.authentication = (req, res) => {
  req.flash('success', `Welcome back: ${req.user.username}`)
  const redirectUrl = req.session.returnTo || '/'
  // Delete redundant data from session
  delete req.session.returnTo
  res.redirect(redirectUrl)
}

// Logout
module.exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You have been logged out.')
  res.redirect('/')
}