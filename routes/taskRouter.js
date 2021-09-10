'use strict';

const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskCtrl.js');
const { validateNewTask } = require('../middleware/taskValidationMiddleware');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');
// authentication
const { isLoggedIn } = require('../middleware/isLoggedIn');


// Basepage
router.route('/new-task')
  // Create new task
  .get(isLoggedIn, taskCtrl.new)
  // Post new task
  .post(isLoggedIn, validateNewTask, catchAsync(taskCtrl.postNewTask))

// Edit task page
router.route('/edit/:taskId')
// Edit task info page
  .get(isLoggedIn, catchAsync(taskCtrl.editTask))
// Patch task
  .patch(isLoggedIn, validateNewTask, catchAsync(taskCtrl.updateTask))

// Delete task page
router.route('/delete/:taskId')
// Delete task
  .get(isLoggedIn, catchAsync(taskCtrl.confirmDeleteTask))
// Delete the task
  .delete(isLoggedIn, catchAsync(taskCtrl.deleteTask))


module.exports = router;