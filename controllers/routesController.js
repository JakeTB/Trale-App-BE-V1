const { getAllRoutes } = require("../models/routesModels")

exports.sendAllRoutes = (req, res, next) => {
  getAllRoutes()
}