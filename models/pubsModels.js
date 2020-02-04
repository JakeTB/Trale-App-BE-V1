const connection = require("../db/connection");
exports.getAllPubs = () => {
  return connection.select("*").from("pubs");
};


exports.getSinglePub = params => {
  const { id } = params
  return connection
    .select("*")
    .from("pubs")
    .where({ id })
    .then(pub => {
      if (pub[0]) return pub;
      else {
        return Promise.reject({
          message: "That id does not exist",
          status: 404
        })
      }
    })
}