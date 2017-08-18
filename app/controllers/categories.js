var Categories = require('../models/categories');
var picHelper = require('../helpers/pictureUploads');

module.exports = {
  add(req, res) {
    res.render('category', {title: 'Categories'});
  },
  delete(req, res) {
    return Categories.forge({id: req.params.id}).destroy().then(function(model) {
      res.redirect('/categories/');
    })
    .catch(function(error) {
      res.render('error', {error: error, message: 'Can not delete.', title: 'Categories'});
    });
  },
  edit(req, res) {
    if (req.params.id) {
      return Categories.forge({id: req.params.id}).fetch().then(function(category) {
        res.render('category', {results: category.attributes, errors: false, title: 'Categories'});
      })
      .catch( function(error){
        res.render('error', {error: error, title: 'Categories'});
      });
    } else {
      res.render('category', {title: 'Categories'});
    }
  },
  listAll(req, res) {
    return Categories.forge().orderBy('name', 'ASC').fetchAll().then(function(categories) {
      res.render('cats-list', {results: categories.models, title: 'Categories'});
    })
    .catch( function(error){
      res.render('error', {title: 'Categories', error: error});
    });
  },
  single(req, res) {
    return Categories.forge({id: req.params.id}).fetch().then(function(category) {
      res.render('category', {results: category.attributes, title: 'Categories', errors: false});
    });
  },
  upsert(req, res) {
    var options = {};
    var categoryID = '';
    var message = '';
    if (!req.params.id) {
      options.method = 'insert';
      message = "Successfully Created!";
    } else {
      categoryID = {id: req.params.id};
      options.method = 'update';
      options.patch = 'true';
      message = "Updated Successfully!";
    }

    // Validate the input fields
    req.checkBody('categoryName', 'The name or title of the category must not be empty.').notEmpty();

    // SQL sanitizing happens in Postgres and knex level
    var values = {
      name: req.body.categoryName,
    };

    console.log(req.file);
    values.icon = picHelper.handlePicture(req.file, req.body.icon_name, req.body.del_icon);

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return Categories.forge(categoryID).save(values, options).then(function(category) {
          res.render('category', {results: category.attributes, title: 'Categories', message: message});
        });
      } else {
        if (placeID !== '') {
          return Categories.forge(categoryID).fetch().then(function(category) {
            res.render('category', {results: category.attributes, title: 'Categories', errors: result.array()});
          });
        } else {
          res.render('category', {title: 'Categories', errors: result.array() });
        }
      }
    });  
  },
};
