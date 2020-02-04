const { sendAllRoutes } = require("../controllers/routesController")

const routesRouter = require("express").Router();

routesRouter.route("/").get(sendAllRoutes)

module.exports = { routesRouter }