const { getAllRoutes, getSingleRoute } = require("../models/routesModels");

exports.sendAllRoutes = (req, res, next) => {
  getAllRoutes().then(routes => {
    res.status(200).send({ routes });
  });
};
exports.sendSingleRoute = (req, res, next) => {
  getSingleRoute(req.params).then(route => {
    res.status(200).send({ route });
  });
};
