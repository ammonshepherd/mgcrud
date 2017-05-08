var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

/* GET users listing. */
router.use('/*', function(req, res, next) {
  res.render('users', {userInfo: req.user.attributes});
});

module.exports = router;
