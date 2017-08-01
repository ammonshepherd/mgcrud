var Locations = require('../models/locations');
var Tools = require('../models/tools');
var People = require('../models/people');
var Categories = require('../models/categories');

var cats = require('../helpers/getCategories');
var locs = require('../helpers/getLocations');
var allCats = cats.getCategories();
var allLocs = locs.getLocations();


module.exports = {
  //Grab all the info for the main page location's section and each location page
  // return the data as a json file
  locations(req, res) {
    return Locations.forge().orderBy('name', 'ASC').fetchAll({withRelated: ['people','tools']}).then(function(locations) {
      res.setHeader('Content-Type', 'application/json');
      //res.json(locations);
      // send it in pretty format
      res.send(JSON.stringify(locations, null, 3));
    });
  },

  // Get all of the people
  people(req, res) {
    return People.forge().orderBy('name', 'ASC').fetchAll({withRelated: ['location']}).then(function(people) {
      res.setHeader('Content-Type', 'application/json');
      //res.json(people);
      // send it in pretty format
      res.send(JSON.stringify(people, null, 3));
    });
  },

  // Get all the categories and the tools associated
  categories(req, res) {
    return Categories.forge().orderBy('name', 'ASC').fetchAll({withRelated: ['tools']}).then(function(categories) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(categories, null, 3));
    });
  }
};
