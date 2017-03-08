var Categories = require('../models/categories');

exports.getCategories = function() {
  var catArray = [];
  Categories.forge().orderBy('name', 'ASC').fetchAll().then(function(cats) {
      cats.models.forEach(function(ModelBase) {
          catArray.push(ModelBase.attributes.name);
      });
  });
  return catArray;
};

