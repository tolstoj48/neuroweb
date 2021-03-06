'use strict';

const express = require('express')
  , router = express.Router()
  , baseCtrl = require('../controllers/baseCtrl')
  // CatchAsync - error handler pro async functions
  , catchAsync = require('../utilities/catchAsyncUtil')
  // Authentication
  , { isLoggedIn } = require('../middleware/isLoggedIn')

// Basepage
router.route('/')
  .get(isLoggedIn, catchAsync(baseCtrl.home))

// In-house db
router.route('/in-house-db')
  .get(isLoggedIn, baseCtrl.inhousedb)

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
