var Locations = require('../models/locations');
var Tools = require('../models/tools');
var People = require('../models/people');
var Categories = require('../models/categories');

var cats = require('../helpers/getCategories');
var locs = require('../helpers/getLocations');
var allCats = cats.getCategories();
var allLocs = locs.getLocations();


module.exports = {
  // Get all the categories and the tools associated
  categories(req, res) {
    return Categories.forge().orderBy('name', 'ASC').fetchAll({withRelated: ['tools', 'tools.location']}).then(function(categories) {
      var categoryLocations = [];
      Object.keys(categories.models).forEach(function (catKey) {
        var cat = {};
        var catName = categories.models[catKey].attributes.name;
        cat.name = catName;
        cat.slug = catName.replace(/[\W]+/g, '-').toLowerCase();
        cat.icon = '';
        //cat.icon = categories.models[catKey].attributes.icon;
        var toolsObj = categories.models[catKey].relations.tools.models;
        var locObj = categories.models[catKey].relations.tools.models;
        var all_locations = [];
        var uniqu_locations;

        Object.keys(toolsObj).forEach(function(toolKey) {
          var tools = toolsObj[toolKey].attributes;
          if (tools.visible === true) {
            Object.keys(locObj).forEach(function(locKey) {
              all_locations.push(locObj[locKey].relations.location.attributes.name);
            });
          }
          // Just get unique location ids
          // https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
          uniq_locations = all_locations.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
          cat.locations = uniq_locations;
        });
        categoryLocations.push(cat);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(categoryLocations, null, 3));
    });
  },

  //Grab all the info for the main page location's section and each location page
  // return the data as a json file
  locations(req, res) {
    return Locations.forge().orderBy('name', 'ASC').where('visible', 'true').fetchAll({withRelated: ['people','tools']}).then(function(locations) {
      res.setHeader('Content-Type', 'application/json');
      //res.json(locations);
      // send it in pretty format
      res.send(JSON.stringify(locations, null, 3));
    });
  },

  // Get all of the people
  people(req, res) {
    return People.forge().orderBy('name', 'ASC').where('visible', 'true').fetchAll({withRelated: ['location']}).then(function(people) {
      res.setHeader('Content-Type', 'application/json');
      //res.json(people);
      // send it in pretty format
      res.send(JSON.stringify(people, null, 3));
    });
  },

  tools(req, res) {
    return Tools.forge().orderBy('name', 'ASC').where('visible', 'true').fetchAll().then(function(tools) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(tools, null, 3));
    });
  }
};
