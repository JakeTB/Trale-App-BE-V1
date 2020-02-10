const connection = require("../db/connection");

exports.postUserRoute = body => {
  const { user_id, routes_id } = body;
  const progress = 0;
  const newUserRoute = { user_id, routes_id, progress };

  return connection
    .insert(newUserRoute)
    .into("user_routes")
    .returning("*")
    .then(userRoute => {
      return userRoute[0];
    });
};
exports.patchUserRoutes = body => {
  const { user_id, routes_id } = body;

  return connection("user_routes")
    .where({ user_id, routes_id })
    .increment("progress")
    .returning("*")
    .then(updatedUserRoute => {
      return updatedUserRoute[0];
    });
};
exports.getSingleUserRoutes = params => {
  console.log(params);
  const { userid } = params;
};
