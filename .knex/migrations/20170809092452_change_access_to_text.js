
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('Locations', function(table) {
      table.text('access').alter();
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('Locations', function(table) {
      table.string('access').alter();
    })
  ]); 
};
