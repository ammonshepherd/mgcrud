var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var users = require('../controllers/users');
var auth = require('../controllers/auth');

/* GET users listing. */
router.get('/', auth.adminRequired, users.list);

router.get('/add', auth.adminRequired, users.edit);
router.post('/add', auth.adminRequired, upload.single('avatar'), users.update);

router.get('/delete/:id', auth.adminRequired, users.delete);

router.get('/:user', auth.adminOrSelf, users.edit);
router.post('/:user', auth.adminOrSelf, upload.single('avatar'), users.update);

module.exports = router;
