var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var users = require('../controllers/users');

/* GET users listing. */
router.get('/:user', users.single);

router.post('/update', users.update);

module.exports = router;
