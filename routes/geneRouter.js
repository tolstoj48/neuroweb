'use strict';

const express = require('express');
const router = express.Router();
const geneCtrl = require('../controllers/geneCtrl.js');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');


// Search gene page
router.route('/search')
  // Search gene
  .get(geneCtrl.searchGene)


module.exports = router;