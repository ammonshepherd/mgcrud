var Tools = require('../models/tools');

var cats = require('../helpers/getCategories');
var locs = require('../helpers/getLocations');

module.exports = {
  add(req, res) {
    res.render('tool');
  },
  delete(req, res) {
    return Tools.forge({id: req.params.id}).destroy().then(function(model) {
      res.redirect('/tools/');
    });
  },
  edit(req, res) {
    var allCats = cats.getCategories();
    var allLocs = locs.getLocations();
    if (req.params.id) {
      return Tools.forge({id: req.params.id}).fetch().then(function(tool) {
        res.render('tool', {results: tool.attributes, categories: allCats, locations: allLocs, loc: tool.related('locations'), kind: 'tools'});
      });
    } else {
      res.render('tool', {kind: 'tools', locations: allLocs, categories: allCats });
    }
  },
  listAll(req, res) {
    return Tools.forge().orderBy('name', 'ASC').fetchAll().then(function(tools) {
      res.render('list', {results: tools.models, kind: 'tools', skipFields: ['id', 'created_at', 'updated_at', 'location_id']});
    })
    .catch( function(error){console.log(error);} );
  },
  single(req, res) {
    return Tools.forge({id: req.params.id}).fetch().then(function(tool) {
      res.render('tool', {results: tool.attributes, errors: false});
    });
  },
  upsert(req, res) {
    var options = {};
    var toolID = '';
    if (!req.params.id) {
      options.method = 'insert';
    } else {
      toolID = {id: req.params.id};
      options.method = 'update';
      options.patch = 'true';
    }

    // Validate the input fields
    req.checkBody('toolName', 'The name or title of the tool must not be empty.').notEmpty();

    // SQL sanitizing happens in Postgres and knex level
    var values = {
      name: req.body.toolName,
      make: req.body.make,
      model: req.body.model,
      category: req.body.category,
      quantity: req.body.quantity,
    };

    if (req.file) {
      values.picture = req.file.filename;
    }


    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return Tools.forge(toolID).save(values, options).then(function(ret) {
          if (!toolID) {
            toolID = {id: ret.id};
          }
          // After successful update/insert, grab the updated/new data and display the page
          res.redirect('/tools/edit/' + toolID.id);
        });
      } else {
        return Tools.forge(toolID).fetch().then(function(tool) {
          res.render('tool', {results: tool.attributes, errors: result.array()});
        });

      }
    });  
  },
};
