'use strict';

const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentCtrl.js');
const { isLoggedIn, validateNewComment } = require("../middleware/commentsValidationMiddleware");
// catchAsync - error handler pro async functions
const catchAsync = require("../utilities/catchAsyncUtil");


// Basepage
router.route('/new-comment')
  // Create new comment
  .get(commentCtrl.new)
  // Post new comment
  .post(validateNewComment, catchAsync(commentCtrl.postNewComment))

// Edit comment page
router.route("/edit/:commentId")
// Edit comment info page
  .get(catchAsync(commentCtrl.editComment))
// Patch comment
  .patch(validateNewComment, catchAsync(commentCtrl.updateComment))

// Delete comment page
router.route("/delete/:commentId")
// Delete comment
  .get(catchAsync(commentCtrl.confirmDeleteComment))
// Delete the comment
  .delete(catchAsync(commentCtrl.deleteComment))


module.exports = router;