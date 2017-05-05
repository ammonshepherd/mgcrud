var express = require('express');
var router = express.Router();

// middleware for checking logged in status, etc
var auth = require('../controllers/auth');

/* Routes with individual route files */
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/user', require('./users'));

router.use('/locations', auth.loginRequired, require('./locations'));
router.use('/tools', require('./tools'));
router.use('/categories', require('./categories'));

/* Routes of domain name http://domainname.com/xyz */
  // Home page
router.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });
router.get('/login', function(req, res, next) { res.render('login'); });
router.get('/register', function(req, res, next) { res.render('register'); });

module.exports = router;
