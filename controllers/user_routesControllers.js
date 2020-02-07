const {
  postUserRoute,
  patchUserRoutes
} = require("../models/user_routesModels");

exports.sendAllUserRoutes = (req, res, next) => {};
exports.createUserRoutes = (req, res, next) => {
  postUserRoute(req.body).then(userRoute => {
    res.status(201).send({ userRoute });
  });
};
exports.updateUserRoutes = (req, res, next) => {
  patchUserRoutes(req.body).then(updatedUserRoutes => {
    console.log("THEN");
    res.status(201).send({ updatedUserRoutes });
  });
};
