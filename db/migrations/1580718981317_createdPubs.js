exports.up = function(knex) {
  return knex.schema
    .createTable("pubs", pubsTable => {
      pubsTable.increments("id").primary();
      pubsTable.text("pub_picture");
      pubsTable.text("pub_description");
      pubsTable.string("pub_name").notNullable();
      pubsTable.text("pub_address").notNullable();
      pubsTable.float("lat").notNullable();
      pubsTable.float("lng").notNullable();
      pubsTable
        .integer("routes_id")
        .references("id")
        .inTable("routes")
        .onDelete("cascade");
    })
    .then(() => {
      console.log("Pubs table created");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("pubs");
};
