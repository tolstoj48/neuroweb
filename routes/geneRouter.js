'use strict';

const express = require('express');
const router = express.Router();
const geneCtrl = require('../controllers/geneCtrl.js');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');
// authentication
const { isLoggedIn } = require('../middleware/isLoggedIn');
// authorization
const authorize = require('../middleware/authorizeMiddleware');


// Search inhouse db
router.route('/search')
  // Search gene
  .get(isLoggedIn, catchAsync(geneCtrl.searchGene));

// Importing data to inhouse db
router.route('/import-data')
  // Get import data page
  .get(isLoggedIn, authorize("Admin"), geneCtrl.importDataMainPage)
  // Post data and validate them
  .post(isLoggedIn, authorize("Admin"), catchAsync(geneCtrl.importData));

//Delete data
router.route('/delete-data-confirm')
  //Get delete data confirm page
  .get(isLoggedIn, authorize("Admin"), geneCtrl.deleteDataConfirmPage)

router.route('/delete-data')  
  //Get deleze data confirm
  .get(isLoggedIn, authorize("Admin"), catchAsync(geneCtrl.deleteData));

module.exports = router;