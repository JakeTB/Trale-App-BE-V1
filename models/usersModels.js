const connection = require("../db/connection");
exports.getAllUsers = () => {
  return connection.select("*").from("users");
};
exports.getSingleUser = params => {
  const { id } = params;
  return connection
    .select("*")
    .from("users")
    .where({ id });
};
