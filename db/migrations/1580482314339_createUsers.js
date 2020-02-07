exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.increments("id").primary();
    usersTable.text("avatar");
    usersTable.string("username").unique();
    usersTable.timestamp("joined").defaultTo(knex.fn.now());
    usersTable.specificType("active_route", "INT[]");
    usersTable.text("bio");
    usersTable.specificType("completed_route", "INT[]");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
