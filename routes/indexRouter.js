const express = require('express');
const router = express.Router();
const baseCtrl = require('../controllers/baseCtrl');

// basepage
router.route('/')
  .get(baseCtrl.home)

  // Useful links
router.route('/links')
  .get(baseCtrl.links)

// Analysis upload
router.route('/analysis')
  .get(baseCtrl.analysis)

// Db search
router.route('/dbsearch')
  .get(baseCtrl.dbsearch)

module.exports = router;
