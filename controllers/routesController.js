const { getAllRoutes } = require("../models/routesModels");

exports.sendAllRoutes = (req, res, next) => {
  getAllRoutes().then(routes => {
    res.status(200).send({ routes });
  });
};
