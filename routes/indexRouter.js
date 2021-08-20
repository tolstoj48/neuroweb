'use strict';

const express = require('express');
const router = express.Router();
const baseCtrl = require('../controllers/baseCtrl');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');

// basepage
router.route('/')
  .get(catchAsync(baseCtrl.home))

// In-house db
router.route('/in-house-db')
  .get(baseCtrl.inhousedb)

// Annotation
router.route('/annotation')
  .get(baseCtrl.annotation)

// Filter
router.route('/filter')
  .get(baseCtrl.filter)

// Merge
router.route('/merge')
  .get(baseCtrl.merge)

// Beos
router.route('/beds')
  .get(baseCtrl.beds)

// Fastqs
router.route('/fastqs')
  .get(baseCtrl.fastqs)

// Bam-crams
router.route('/bam-crams')
  .get(baseCtrl.bamcrams)

// NGS comments
router.route('/ngs-com')
  .get(baseCtrl.ngscom)



module.exports = router;
