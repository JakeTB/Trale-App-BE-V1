const {
  sendAllRoutes,
  sendSingleRoute
} = require("../controllers/routesController");

const routesRouter = require("express").Router();

routesRouter.route("/").get(sendAllRoutes);
routesRouter.route("/:id").get(sendSingleRoute);

module.exports = { routesRouter };
