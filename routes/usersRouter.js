'use strict';

const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utilities/catchAsyncUtil')
const { isLoggedIn } = require('../middleware/isLoggedIn')
// || CONTROLLER
const usersCtrl = require('../controllers/usersCtrl')

// register page
router.route('/register')
  .get(isLoggedIn, usersCtrl.register)
  .post(isLoggedIn, catchAsync(usersCtrl.newUser))

// login view
router.route('/login')
  .get(usersCtrl.login)
  .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), usersCtrl.authentication)


router.get('/logout', isLoggedIn, usersCtrl.logout)

module.exports = router