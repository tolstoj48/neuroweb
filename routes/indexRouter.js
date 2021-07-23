'use strict';

const express = require('express');
const router = express.Router();
const baseCtrl = require('../controllers/baseCtrl');

// basepage
router.route('/')
  .get(baseCtrl.home)

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
router.route('/beos')
  .get(baseCtrl.beos)

// Fastqs
router.route('/fastqs')
  .get(baseCtrl.fastqs)

// Bam-crams
router.route('/bam-crams')
  .get(baseCtrl.bamcrams)



module.exports = router;
