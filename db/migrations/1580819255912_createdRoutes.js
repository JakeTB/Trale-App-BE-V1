exports.up = function(knex) {
  return knex.schema.createTable("routes", routesTable => {
    routesTable.increments("id").primary();
    routesTable.text("route_description");
    routesTable.text("route_name").notNullable();
    routesTable.text("route_picture");
    routesTable.specificType("related_pubs", "INT[]").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("pubs");
};