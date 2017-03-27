/* This route file handles all URL's that go http://domainname/locations/ */
var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var locationsController = require('../controllers/locations');

/* GET users listing. Below routes are without the 'location' which is included. */
router.get('/', locationsController.listAll );

router.get('/edit/', locationsController.edit);
router.post('/edit/', upload.single('loc_image'), locationsController.upsert);

router.get('/edit/:id', locationsController.edit);
router.post('/edit/:id', upload.single('loc_image'), locationsController.upsert);

router.get('/delete/:id', locationsController.delete);

module.exports = router;
