'use strict';

const express = require('express')
  , passport = require('passport')
  , router = express.Router()
  , catchAsync = require('../utilities/catchAsyncUtil')
  , { isLoggedIn } = require('../middleware/isLoggedIn')
  , { isLoggedInAndAuthenticated } = require('../middleware/isLoggedInAndAuthenticated')
  , authorize = require('../middleware/authorizeMiddleware')
  , { validateNewUser } = require('../middleware/userValidationMiddleware')
  , usersCtrl = require('../controllers/usersCtrl')

// register page
router.route('/register')
  .get(isLoggedIn, authorize("Admin"), usersCtrl.register)
  .post(isLoggedIn, authorize("Admin"), validateNewUser, catchAsync(usersCtrl.newUser))

// login view
router.route('/login')
  .get(isLoggedInAndAuthenticated, usersCtrl.login)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersCtrl.authentication)


router.get('/logout', isLoggedIn, usersCtrl.logout);

module.exports = router;