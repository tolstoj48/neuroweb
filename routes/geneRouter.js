'use strict';

const express = require('express');
const router = express.Router();
const geneCtrl = require('../controllers/geneCtrl.js');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');


// Search inhouse db
router.route('/search')
  // Search gene
  .get(catchAsync(geneCtrl.searchGene));

// Importing data to inhouse db
router.route('/import-data')
  // Get import data page
  .get(geneCtrl.importDataMainPage)
  // Post data and validate them
  .post(catchAsync(geneCtrl.importData));


module.exports = router;