exports.up = function(knex) {
  return knex.schema.createTable("routes", routesTable => {
    routesTable.increments("id").primary();
    routesTable.text("route_description");
    routesTable.text("route_name").notNullable();
    routesTable.text("route_picture");
    routesTable.text("route_type");
    routesTable.integer("route_PubCount");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("routes");
};
