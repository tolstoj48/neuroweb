'use strict';

const express = require('express')
  , router = express.Router()
  , annotationCtrl = require('../controllers/annotationCtrl.js')
  , { isLoggedIn } = require('../middleware/isLoggedIn')
  // CatchAsync - error handler pro async functiona
  , catchAsync = require('../utilities/catchAsyncUtil')


// Annotation
router.route('/')
  .get(isLoggedIn, catchAsync(annotationCtrl.annotation))

// Annotated files downloads
router.route('/download/:fileName')
  .get(isLoggedIn, annotationCtrl.downloadAnnotatedFile)

// File upload for annotation
router.route('/upload-data')
  .get(isLoggedIn, annotationCtrl.uploadFileForAnotation)
// Post data and validate them
  .post(isLoggedIn, catchAsync(annotationCtrl.importData))

module.exports = router;