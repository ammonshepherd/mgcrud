var Categories = require('../models/categories');

module.exports = {
  add(req, res) {
    res.render('category');
  },
  delete(req, res) {
    return Categories.forge({id: req.params.id}).destroy().then(function(model) {
      res.redirect('/categories/');
    });
  },
  edit(req, res) {
    if (req.params.id) {
      return Categories.forge({id: req.params.id}).fetch().then(function(category) {
        res.render('category', {results: category.attributes, kind: 'categories', errors: false});
      })
      .catch( function(error){console.log(error);} );
    } else {
      res.render('category');
    }
  },
  listAll(req, res) {
    return Categories.forge().orderBy('name', 'ASC').fetchAll().then(function(categories) {
      res.render('list', {results: categories.models, kind: 'categories', skipFields: ['id', 'created_at', 'updated_at', 'location_id']});
    })
    .catch( function(error){console.log(error);} );
  },
  single(req, res) {
    return Categories.forge({id: req.params.id}).fetch().then(function(category) {
      res.render('category', {results: category.attributes, errors: false});
    });
  },
  upsert(req, res) {
    var options = {};
    var categoryID = '';
    if (!req.params.id) {
      options.method = 'insert';
    } else {
      categoryID = {id: req.params.id};
      options.method = 'update';
      options.patch = 'true';
    }

    // Validate the input fields
    req.checkBody('categoryName', 'The name or title of the category must not be empty.').notEmpty();

    // SQL sanitizing happens in Postgres and knex level
    var values = {
      name: req.body.categoryName,
    };

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return Categories.forge(categoryID).save(values, options).then(function(ret) {
          if (!categoryID) {
            categoryID = {id: ret.id};
          }
          // After successful update/insert, grab the updated/new data and display the page
          res.redirect('/categories/edit/' + categoryID.id);
        });
      } else {
        return Categories.forge(categoryID).fetch().then(function(category) {
          res.render('category', {results: category.attributes, errors: result.array()});
        });

      }
    });  
  },
};
