var express = require('express');
var router = express.Router();

var passport = require('../auth/local');
var auth = require('../controllers/auth');

router.get('/logout', auth.loginRequired, function(req, res, next) {
  req.logout();
  console.log('logout');
});

router.post('/register', auth.isLoggedIn, auth.userExists, auth.register);

/*
router.post('/login', auth.isLoggedIn, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log('error from login: ' + err); }
    if (!user) { console.log('no user from login'); }
    if (user) {
      req.logIn(user, function(err) {
        if (err) { console.log('got user but error ' + err); }
        console.log('success, logged in as ' + user);
      });
    }
  });
});
*/

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: 'Incorrect user or pass.'}), function(req, res) {
  res.redirect('/user/' + res.user.username);
});

module.exports = router;
