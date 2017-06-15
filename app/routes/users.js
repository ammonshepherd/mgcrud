var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var users = require('../controllers/users');

/* GET users listing. */
router.get('/', users.list);

router.get('/add', users.edit);
router.post('/add', upload.single('avatar'), users.update);

router.get('/delete/:id', users.delete);

router.get('/:user', users.edit);
router.post('/:user', upload.single('avatar'), users.update);

module.exports = router;
