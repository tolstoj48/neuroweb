'use strict';

const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskCtrl.js');
const { isLoggedIn, validateNewTask } = require("../middleware/taskValidationMiddleware");
// catchAsync - error handler pro async functions
const catchAsync = require("../utilities/catchAsyncUtil");


// Basepage
router.route('/new-task')
  // Create new task
  .get(taskCtrl.new)
  // Post new task
  .post(validateNewTask, catchAsync(taskCtrl.postNewTask))

module.exports = router;