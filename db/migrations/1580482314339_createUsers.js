exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.increments("id").primary();
    usersTable.text("avatar");
    usersTable.string("username").notNullable();
    usersTable.timestamp("joined").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
