'use strict';

const express = require('express')
  , router = express.Router()
  , fastqsCtrl = require('../controllers/fastqsCtrl')
  , { isLoggedIn } = require('../middleware/isLoggedIn')


// Download a file from a directory
router.route('/download/:fileName')
  // Download a file
  .get(isLoggedIn, fastqsCtrl.downloadAFile)

module.exports = router