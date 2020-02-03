const connection = require("../db/connection");
exports.getAllPubs = () => {
  console.log("inside pubs model");
  return connection.select("*").from("pubs");
};
