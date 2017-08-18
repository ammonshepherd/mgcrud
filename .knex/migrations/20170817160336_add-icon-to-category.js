
exports.up = function(knex, Promise) {
  return knex.schema.table('Categories', function(c) {
    c.string('icon');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Categories', function(c) {
    c.dropColumn('icon');
  });
};
