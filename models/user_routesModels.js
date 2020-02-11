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
  if (!user_id && !routes_id) {
    return Promise.reject({
      status: 400,
      message: "Empty request body"
    });
  }
  if (!user_id) {
    return Promise.reject({
      status: 400,
      message: "No user_id on request body"
    });
  }
  if (!routes_id) {
    return Promise.reject({
      status: 400,
      message: "No routes_id on request body"
    });
  }
  return connection("user_routes")
    .where({ user_id, routes_id })
    .increment("progress")
    .returning("*")
    .then(updatedUserRoute => {
      return updatedUserRoute[0];
    });
};
exports.getSingleUserRoutes = params => {
  const { user_id } = params;
  return connection("user_routes")
    .where({ user_id })
    .returning("*");
};
