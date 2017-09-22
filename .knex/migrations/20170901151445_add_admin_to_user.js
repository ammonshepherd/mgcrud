exports.up = function(knex, Promise) {
  return knex.schema.table('Users', function(t) {
    t.boolean('admin');
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Users', function(t) {
    t.dropColumn('admin');
  }) 
};
