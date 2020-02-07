const {
  postUserRoute,
  patchUserRoutes
} = require("../models/user_routesModels");

exports.sendAllUserRoutes = (req, res, next) => {};
exports.createUserRoutes = (req, res, next) => {
  postUserRoute(req.body)
    .then(userRoute => {
      res.status(201).send({ userRoute });
    })
    .catch(next);
};
exports.updateUserRoutes = (req, res, next) => {
  patchUserRoutes(req.body)
    .then(updatedUserRoutes => {
      res.status(201).send({ updatedUserRoutes });
    })
    .catch(next);
};
