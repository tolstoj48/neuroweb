'use strict';

const User = require('../models/userModel')

// register page
module.exports.register = (req, res) => {
  res.render('users/register', {
    layout: 'index',
    title: 'NGL - New user registration page',
  });
}

// new user creation
module.exports.newUser = async (req, res) => {
  try {
    const { email, username, password } = req.body
    // into the db
    const user = new User({ email, username })
    // registration with passport
    await User.register(user, password)
    req.flash('success', 'User has been registered!')
    res.redirect('/')
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('register')
  }
}

// login view
module.exports.login = (req, res) => {
  res.render('users/login', {
    layout: 'index',
    title: 'NGL - Login page',
  });
}

//passport middleware for local authentication - hashes password and compares to the db
module.exports.authentication = (req, res) => {
  req.flash('success', `Welcome back: ${req.user.username}`)
  const redirectUrl = req.session.returnTo || '/'
  // delete redundant data from session
  delete req.session.returnTo
  res.redirect(redirectUrl)
}

// logout
module.exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You have been logged out.')
  res.redirect('/')
}