'use strict';

const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskCtrl.js');
const { isLoggedIn, validateNewTask } = require('../middleware/taskValidationMiddleware');
// catchAsync - error handler pro async functions
const catchAsync = require('../utilities/catchAsyncUtil');


// Basepage
router.route('/new-task')
  // Create new task
  .get(taskCtrl.new)
  // Post new task
  .post(validateNewTask, catchAsync(taskCtrl.postNewTask))

// Edit task page
router.route('/edit/:taskId')
// Edit task info page
  .get(catchAsync(taskCtrl.editTask))
// Patch task
  .patch(validateNewTask, catchAsync(taskCtrl.updateTask))

// Delete task page
router.route('/delete/:taskId')
// Delete task
  .get(catchAsync(taskCtrl.confirmDeleteTask))
// Delete the task
  .delete(catchAsync(taskCtrl.deleteTask))


module.exports = router;