const {
  sendAllUserRoutes,
  createUserRoutes,
  updateUserRoutes,
  sendSingleUserRoutes
} = require("../controllers/user_routesControllers");

const user_routesRouter = require("express").Router();

user_routesRouter
  .route("/")
  .get(sendAllUserRoutes)
  .post(createUserRoutes)
  .patch(updateUserRoutes);
user_routesRouter.route("/:user_id").get(sendSingleUserRoutes);
module.exports = { user_routesRouter };
