var express = require('express');
var router = express.Router();

// middleware for checking logged in status, etc
var auth = require('../controllers/auth');

/* Routes with individual route files */
  // authentication routes
router.use('/auth', require('./auth'));
router.use('/admin', auth.isLoggedIn, require('./admin'));
router.use('/users', auth.isLoggedIn, require('./users'));

  // the data routes
router.use('/categories', auth.isLoggedIn, require('./categories'));
router.use('/locations', auth.isLoggedIn, require('./locations'));
router.use('/people', auth.isLoggedIn, require('./people'));
router.use('/tools', auth.isLoggedIn, require('./tools'));

 // api routes
router.use('/api', require('./api'));

/* Routes of domain name http://domainname.com/xyz */
  // Home page
router.get('/', auth.isLoggedIn, function(req, res, next) { 
  var userObj = req.user || null;
  res.render('index', {userInfo: userObj, title: 'MakerGrounds @ UVA'}); 
});
  // Authentication
router.get('/login', function(req, res, next) { res.render('login'); });

router.get('/logout', function(req, res, next) { 
  req.logout(); 
  res.redirect('/'); 
});

router.get('/register', function(req, res, next) { res.render('register'); });

module.exports = router;
