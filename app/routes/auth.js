var express = require('express');
var router = express.Router();

var passport = require('../auth/local');
var auth = require('../controllers/auth');

router.post('/register', auth.userExists, auth.register);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

module.exports = router;
