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
  categoriesLocations(req, res) {
    return Categories.forge().orderBy('name', 'ASC').fetchAll({withRelated: ['tools', 'tools.location']}).then(function(categories) {
      var categoryLocations = [];
      Object.keys(categories.models).forEach(function (catKey) {
        var cat = {};
        var catName = categories.models[catKey].attributes.name;
        cat.name = catName;
        cat.slug = catName.replace(/[\W]+/g, '-').toLowerCase();
        cat.icon = categories.models[catKey].attributes.icon;
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
      //res.send(JSON.stringify(locations, null, 3));
      
      var locationsArray = [];
      Object.keys(locations.models).forEach(function (locKey) {
        var loc = {};
        var locObj = locations.models[locKey].attributes;
        var locName = locObj.name;
        loc.name = locName;
        loc.slug = locObj.slug;
        loc.description = locObj.description;
        loc.access = locObj.access;
        loc.hours = locObj.hours;
        loc.address = locObj.address;
        loc.website = locObj.website;
        loc.email = locObj.email;
        loc.phone = locObj.phone;
        loc.latitude = locObj.latitude;
        loc.longitude = locObj.longitude;
        loc.picture = locObj.picture;
        loc.updated_at = locObj.updated_at;

        var toolsArray = [];
        var toolsObj = locations.models[locKey].relations.tools.models;
        Object.keys(toolsObj).forEach(function(toolKey) {
          var tool = toolsObj[toolKey].attributes;
          if (tool.visible === true) {
            var t = {};
            t.name = tool.name;
            t.make = tool.make;
            t.model = tool.model;
            t.slug = tool.name.replace(/[\W]+/g, '-').toLowerCase();
            t.picture = tool.picture;
            t.training = tool.training;
            toolsArray.push(t);
          }
        });
        loc.tools = toolsArray;

        var peopleArray = [];
        var peopleObj = locations.models[locKey].relations.people.models;
        Object.keys(peopleObj).forEach(function(personKey) {
          var person = peopleObj[personKey].attributes;
          if (person.visible === true) {
            var p = {};
            p.name = person.name;
            p.moniker = person.moniker;
            p.department = person.department;
            p.slug = person.name.replace(/[\W]+/g, '-').toLowerCase();
            p.picture = person.picture;
            p.email = person.email;
            peopleArray.push(p);
          }
        });
        loc.people = peopleArray;
        locationsArray.push(loc);
      });
      //jlocations = JSON.stringify(locations, null, 3);
      res.send(JSON.stringify(locationsArray, null, 3));
    });
  },

  // Get all of the people
  people(req, res) {
    return People.forge().orderBy('name', 'ASC').where('visible', 'true').fetchAll({withRelated: ['location']}).then(function(people) {
      var peopleArray = [];
      Object.keys(people.models).forEach(function (personKey) {
        var personObj = people.models[personKey].attributes;
        var person = {};
        person.name = personObj.name;
        person.slug = personObj.name.replace(/[\W]+/g, '-').toLowerCase();
        person.moniker = personObj.moniker;
        person.department = personObj.department;
        person.picture = personObj.picture;
        person.email = personObj.email;
        person.phone = personObj.phone;
        person.website = personObj.website;
        person.office_hours = personObj.office_hours;
        person.office_address = personObj.office_address;
        person.bio = personObj.bio;
        person.location_name = people.models[personKey].relations.location.attributes.name;
        person.location_slug = people.models[personKey].relations.location.attributes.slug;

        peopleArray.push(person);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(peopleArray, null, 3));
    });
  },

  tools(req, res) {
    return Tools.forge().orderBy('name', 'ASC').where('visible', 'true').fetchAll({withRelated: ['location']}).then(function(tools) {
      var allTools = [];
      Object.keys(tools.models).forEach(function (toolKey) {
        var toolObj = tools.models[toolKey].attributes;
        var tool = {};
        tool.name = toolObj.name;
        tool.slug = toolObj.name.replace(/[\W]+/g, '-').toLowerCase();
        tool.make = toolObj.make;
        tool.model = toolObj.model;
        tool.training = toolObj.training;
        tool.picture = toolObj.picture;
        tool.location_name = tools.models[toolKey].relations.location.attributes.name;
        tool.location_slug = tools.models[toolKey].relations.location.attributes.slug;

        allTools.push(tool);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(allTools, null, 3));

    });
  }
};
