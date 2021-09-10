'use strict';

const express = require('express');
const router = express.Router();
const fastqsCtrl = require('../controllers/fastqsCtrl');
const { isLoggedIn } = require('../middleware/isLoggedIn');


// Download a file from a directory
router.route('/download/:fileName')
// download a file
  .get(isLoggedIn, fastqsCtrl.downloadAFile)



module.exports = router