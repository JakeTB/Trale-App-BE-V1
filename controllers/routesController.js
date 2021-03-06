const { getAllRoutes, getSingleRoute } = require("../models/routesModels");

exports.sendAllRoutes = (req, res, next) => {
  getAllRoutes()
    .then(routes => {
      res.status(200).send({ routes });
    })
    .catch(next);
};
exports.sendSingleRoute = (req, res, next) => {
  getSingleRoute(req.params)
    .then(route => {
      console.log(route);
      res.status(200).send({ route });
    })
    .catch(next);
};
