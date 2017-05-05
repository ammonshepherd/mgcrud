var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

router.get('/', auth.adminRequired, function(res, req, next) {
  res.send('admin page');
} );

module.exports = router;
