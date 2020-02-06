const connection = require("../db/connection");

exports.getAllRoutes = () => {
  return connection.select("*").from("routes");
};
exports.getSingleRoute = params => {
  const { id } = params;
  return connection
    .select(
      "pub_name",
      "lat",
      "lng",
      "pubs.id",
      "routes.route_name",
      "pubs.routes_id"
    )
    .from("pubs")
    .leftJoin("routes", "pubs.routes_id", "routes.id")
    .orderBy("pubs.id", "asc");
};
