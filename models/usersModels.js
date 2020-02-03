const connection = require("../db/connection");
exports.getAllUsers = () => {
  return connection.select("*").from("users");
};
