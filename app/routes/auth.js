var express = require('express');
var router = express.Router();

var passport = require('../auth/local');
var auth = require('../controllers/auth');

router.post('/register', auth.isLoggedIn, auth.userExists, auth.register);

router.post('/login', passport.authenticate('local', {failureFlash: 'Incorrect user or pass.'}), function(req, res) {
  res.redirect('/users/' + req.user.attributes.username);
});

module.exports = router;
