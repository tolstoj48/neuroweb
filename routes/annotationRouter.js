'use strict';

const express = require('express');
const router = express.Router();
const annotationCtrl = require('../controllers/annotationCtrl.js');
const { isLoggedIn } = require('../middleware/isLoggedIn');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');


// Annotation
router.route('/')
  .get(isLoggedIn, catchAsync(annotationCtrl.annotation))

// Annotated files downloads
router.route('/download/:fileName')
  .get(isLoggedIn, annotationCtrl.downloadAnnotatedFile)

// File upload for annotation
router.route('/upload-data')
  .get(isLoggedIn, annotationCtrl.uploadFileForAnotation)

module.exports = router;