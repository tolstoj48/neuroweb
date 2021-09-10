'use strict';

const express = require('express');
const router = express.Router();
const baseCtrl = require('../controllers/baseCtrl');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');
// authentication
const { isLoggedIn } = require('../middleware/isLoggedIn');

// basepage
router.route('/')
  .get(isLoggedIn, catchAsync(baseCtrl.home))

// In-house db
router.route('/in-house-db')
  .get(isLoggedIn, baseCtrl.inhousedb)

// Annotation
router.route('/annotation')
  .get(isLoggedIn, baseCtrl.annotation)

// Filter
router.route('/filter')
  .get(isLoggedIn, baseCtrl.filter)

// Merge
router.route('/merge')
  .get(isLoggedIn, baseCtrl.merge)

// Beos
router.route('/beds')
  .get(isLoggedIn, baseCtrl.beds)

// Fastqs
router.route('/fastqs')
  .get(isLoggedIn, baseCtrl.fastqs)

// Bam-crams
router.route('/bam-crams')
  .get(isLoggedIn, baseCtrl.bamcrams)

// NGS comments
router.route('/ngs-com')
  .get(isLoggedIn, baseCtrl.ngscom)



module.exports = router;
