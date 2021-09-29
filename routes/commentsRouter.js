'use strict';

const express = require('express')
  , router = express.Router()
  , commentCtrl = require('../controllers/commentCtrl.js')
  , { validateNewComment } = require('../middleware/commentsValidationMiddleware')
  , { isLoggedIn } = require('../middleware/isLoggedIn')
  // CatchAsync - error handler pro async functions
  , catchAsync = require('../utilities/catchAsyncUtil')


// Basepage
router.route('/new-comment')
  // Create new comment
  .get(isLoggedIn, commentCtrl.new)
  // Post new comment
  .post(isLoggedIn, validateNewComment, catchAsync(commentCtrl.postNewComment))

// Edit comment page
router.route('/edit/:commentId')
  // Edit comment info page
  .get(isLoggedIn, catchAsync(commentCtrl.editComment))
  // Patch comment
  .patch(isLoggedIn, validateNewComment, catchAsync(commentCtrl.updateComment))

// Delete comment page
router.route('/delete/:commentId')
  // Delete comment
  .get(isLoggedIn, catchAsync(commentCtrl.confirmDeleteComment))
  // Delete the comment
  .delete(isLoggedIn, catchAsync(commentCtrl.deleteComment))


module.exports = router;