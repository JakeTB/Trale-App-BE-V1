const connection = require("../db/connection");

exports.getAllRoutes = () => {
  return connection.select("*").from("users")
}