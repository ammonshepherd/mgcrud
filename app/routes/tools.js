/* This route file handles all URL's that go http://domainname/tools/ */
var express = require('express');
var router = express.Router();
var upload = require('../helpers/upload');

var toolsController = require('../controllers/tools');

/* GET users listing. Below routes are without the 'tools' which is included. */
router.get('/', toolsController.listAll );

router.get('/edit/', toolsController.edit);
router.post('/edit/', toolsController.upsert);

router.get('/edit/:id', toolsController.edit);
router.post('/edit/:id', upload.single('tool_image'), toolsController.upsert);

router.get('/delete/:id', toolsController.delete);

module.exports = router;
