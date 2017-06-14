var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var users = require('../controllers/users');

/* GET users listing. */
router.get('/:user', users.single);

router.post('/:user', upload.single('avatar'), users.update);

module.exports = router;
