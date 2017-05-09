var express = require('express');
var router = express.Router();

// middleware for checking logged in status, etc
var auth = require('../controllers/auth');

/* Routes with individual route files */
router.use('/auth', require('./auth'));
router.use('/admin', auth.isLoggedIn, require('./admin'));
router.use('/users', auth.isLoggedIn, require('./users'));

router.use('/locations', auth.isLoggedIn, require('./locations'));
router.use('/tools', auth.isLoggedIn, require('./tools'));
router.use('/categories', auth.isLoggedIn, require('./categories'));

/* Routes of domain name http://domainname.com/xyz */
  // Home page
router.get('/', function(req, res, next) { 
  var userObj = req.user || null;
  res.render('index', {userInfo: userObj}); 
});

router.get('/login', function(req, res, next) { res.render('login'); });

router.get('/logout', function(req, res, next) { 
  req.logout(); 
  res.redirect('/'); 
});

router.get('/register', function(req, res, next) { res.render('register'); });

module.exports = router;
