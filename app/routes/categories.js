/* This route file handles all URL's that go http://domainname/categories/ */
var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var categoriesController = require('../controllers/categories');

/* GET users listing. Below routes are without the 'categories' which is included. */
router.get('/', categoriesController.listAll );

router.get('/edit/', categoriesController.edit);
router.post('/edit/', upload.single('icon_image'), categoriesController.upsert);

router.get('/edit/:id', categoriesController.edit);
router.post('/edit/:id', upload.single('icon_image'), categoriesController.upsert);

router.get('/delete/:id', categoriesController.delete);

module.exports = router;
