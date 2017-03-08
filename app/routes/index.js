var express = require('express');
var router = express.Router();

router.use('/locations', require('./locations'));
router.use('/tools', require('./tools'));
router.use('/categories', require('./categories'));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


module.exports = router;
