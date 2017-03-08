/* This route file handles all URL's that go http://domainname/people/ */
var express = require('express');
var router = express.Router();

var peopleController = require('../controllers/people');

router.get('/', peopleController.listAll );

router.get('/edit/', peopleController.edit);
router.post('/edit/', peopleController.upsert);

router.get('/edit/:id', peopleController.edit);
router.post('/edit/:id', peopleController.upsert);

router.get('/delete/:id', peopleController.delete);

module.exports = router;
