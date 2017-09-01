var express = require('express');
var router = express.Router();

var passport = require('../auth/local');
var auth = require('../controllers/auth');

router.post('/register', auth.userExists, auth.emailExists, auth.register);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/reset', function(req, res, next) {
  res.render('reset');
});

router.post('/reset', auth.resetPass);

router.get('*', function(req, res, next) {
    res.redirect('/login');
});

module.exports = router;
