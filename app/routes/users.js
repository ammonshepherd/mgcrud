var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

/* GET users listing. */
router.use('/', auth.loginRequired, function(req, res, next) {
  res.render('users', {values: req.body});
});

module.exports = router;
