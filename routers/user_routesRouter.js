const {
  sendAllUserRoutes,
  createUserRoutes,
  updateUserRoutes
} = require("../controllers/user_routesControllers");

const user_routesRouter = require("express").Router();

user_routesRouter
  .route("/")
  .get(sendAllUserRoutes)
  .post(createUserRoutes)
  .patch(updateUserRoutes);

module.exports = { user_routesRouter };
