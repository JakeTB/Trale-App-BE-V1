const connection = require("../db/connection");

exports.getAllRoutes = () => {
  return connection.select("*").from("routes");
};
exports.getSingleRoute = params => {
  const { id } = params;
  return connection
    .select("pub_name", "lat", "lng")
    .from("pubs")
    .where("routes_id", id);
};
