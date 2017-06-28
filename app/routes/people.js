/* This route file handles all URL's that go http://domainname/people/ */
var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var peopleController = require('../controllers/people');

router.get('/', peopleController.list );

router.get('/add', peopleController.edit);
router.post('/add', upload.single('avatar'), peopleController.upsert);

router.get('/edit/:id', peopleController.edit);
router.post('/edit/:id', upload.single('avatar'), peopleController.upsert);

router.get('/delete/:id', peopleController.delete);

module.exports = router;
