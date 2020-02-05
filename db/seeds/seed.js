const { userData, pubsData, routesData } = require("../data/index.js");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("users")
        .insert(userData)
        .then(() => {
          console.log("Successfully seeded users data");

          return knex("routes")
            .insert(routesData)
            .then(() => {
              console.log("Successfully seeded routes data");
              return knex("pubs")
                .insert(pubsData)
                .then(() => {
                  console.log("Successfully seeded pubs data");
                });
            });
        });
    });
};
