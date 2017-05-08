var express = require('express');
var router = express.Router();

// middleware for checking logged in status, etc
var auth = require('../controllers/auth');

/* Routes with individual route files */
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/users', auth.isLoggedIn, auth.loginRequired, require('./users'));

router.use('/locations', auth.isLoggedIn, auth.loginRequired, require('./locations'));
router.use('/tools', require('./tools'));
router.use('/categories', require('./categories'));

/* Routes of domain name http://domainname.com/xyz */
  // Home page
router.get('/', auth.isLoggedIn, function(req, res, next) { 
  console.log('home page' + req.local.user);
  var userObj = '';
  if (req.local.user) {
    userObj = req.local.user.attributes;
  }
  res.render('index', { userInfo: userObj }); 
});

router.get('/login', function(req, res, next) { res.render('login'); });

router.get('/logout', function(req, res, next) { 
  req.logout(); 
  res.redirect('/'); 
});

router.get('/register', function(req, res, next) { res.render('register'); });

module.exports = router;
