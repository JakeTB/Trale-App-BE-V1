const connection = require("../db/connection");

exports.postUserRoute = body => {
  console.log("Incoming post", body);
  const { user_id, routes_id, route_name } = body;
  const progress = 0;
  const newUserRoute = { user_id, routes_id, progress, route_name };
  if (!user_id && !routes_id) {
    return Promise.reject({
      status: 400,
      message: "No request body"
    });
  }
  if (!user_id) {
    return Promise.reject({
      status: 400,
      message: "No user_id"
    });
  }
  if (!routes_id) {
    return Promise.reject({
      status: 400,
      message: "No routes_id"
    });
  }
  return connection
    .insert(newUserRoute)
    .into("user_routes")
    .returning("*")
    .then(userRoute => {
      return userRoute[0];
    });
};
exports.patchUserRoutes = body => {
  const { user_id, routes_id, completed, inc_progress } = body;
  console.log("patchUserRoutes", body);
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
    .increment("progress", inc_progress)
    .update({ completed })
    .returning("*")
    .then(updatedUserRoute => {
      return updatedUserRoute[0];
    });
};
exports.getSingleUserRoutes = params => {
  const { user_id } = params;
  console.log("Here");
  return connection
    .select("user_routes.*", "routes.route_PubCount")
    .from("user_routes")
    .where({ user_id })
    .leftJoin("routes", "user_routes.routes_id", "routes.id")
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 400,
          message: "No value for that id"
        });
      }
      return response;
    });
};
