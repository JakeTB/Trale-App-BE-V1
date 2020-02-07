exports.up = function(knex) {
  return knex.schema.createTable("user_routes", userroutesTable => {
    userroutesTable.increments("id").primary();
    userroutesTable
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    userroutesTable
      .integer("routes_id")
      .references("id")
      .inTable("routes")
      .onDelete("cascade");
    userroutesTable.integer("progress");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_routes");
};
