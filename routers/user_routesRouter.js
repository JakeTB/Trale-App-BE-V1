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
user_routesRouter.route("/userid").get(sendSingleUserRoutes);
module.exports = { user_routesRouter };
