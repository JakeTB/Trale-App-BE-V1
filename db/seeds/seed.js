const { userData, pubsData, routesData } = require("../data/index.js");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("users")
        .insert(userData)
        .then(() => {
          return knex("pubs")
            .insert(pubsData)
            .then(() => {
              return knex("routes").insert(routesData);
            });
        });
    });
};
