var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

/* GET users listing. */
router.use('/*', auth.loginRequired, function(req, res, next) {
  console.log(req.user);
  res.render('users', {userInfo: req.user.attributes});
});

module.exports = router;
