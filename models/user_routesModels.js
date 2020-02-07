const connection = require("../db/connection");

exports.postUserRoute = body => {
  console.log("inside model");
  const { user_id, routes_id, progress } = body;
  const newUserRoute = { user_id, routes_id, progress };
  console.log("newUserRoute", newUserRoute);
  return connection
    .insert(newUserRoute)
    .into("user_routes")
    .returning("*")
    .then(userRoute => {
      return userRoute[0];
    });
};
