'use strict';

const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskCtrl.js');

// basepage
router.route('/new-task')
  .get(taskCtrl.new)


module.exports = router;