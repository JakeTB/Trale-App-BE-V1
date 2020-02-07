const {
  sendAllUserRoutes,
  createUserRoutes
} = require("../controllers/user_routesControllers");

const user_routesRouter = require("express").Router();
console.log("HERE");
user_routesRouter
  .route("/")
  .get(sendAllUserRoutes)
  .post(createUserRoutes);

module.exports = { user_routesRouter };
