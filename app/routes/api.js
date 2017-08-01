/* This route file handles all URL's that go http://domainname/api/ */
var express = require('express');
var router = express.Router();

var apiCalls = require('../controllers/apicalls');

// Get locations for main page location section and location page
// data needed
// name, picture, address, website, description, access, hours, email, phone, and get a list of tools and people assigned to this location
router.get('/locations', apiCalls.locations );

// Get all the people from the database
router.get('/people', apiCalls.people );

router.get('/categories', apiCalls.categories);


module.exports = router;
