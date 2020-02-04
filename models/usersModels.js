const connection = require("../db/connection");
exports.getAllUsers = () => {
  return connection.select("*").from("users");
};
exports.getSingleUser = params => {
  const { id } = params;
  return connection
    .select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user[0]) return user;
      else {
        return Promise.reject({
          message: "That id does not exist",
          status: 404
        });
      }
    });
};
exports.patchSingleUser = (params, body) => {
  const { id } = params;
  const { avatar } = body;
  return connection
    .select("*")
    .from("users")
    .where({ id })
    .update({ avatar })
    .returning("*");
};
