const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/homeCtrl');

/* GET home page. */
router.route('/')
  // domácí stránka
  .get(homeCtrl.home);


module.exports = router;
