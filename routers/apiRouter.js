const apiRouter = require("express").Router();
const { userRouter } = require("./userRouter");
const { pubsRouter } = require("./pubsRouter");
const { routesRouter } = require("./routesRouter");
const { user_routesRouter } = require("./user_routesRouter");
apiRouter.route("/").get((req, res, next) => {
  res.status(200).send({
    "/api/routes": "Path for Routes Endpoint GET - Sends all Routes",
    "/api/users": ""
  });
});
apiRouter.use("/users", userRouter);
apiRouter.use("/pubs", pubsRouter);
apiRouter.use("/routes", routesRouter);
apiRouter.use("/user_routes", user_routesRouter);
module.exports = { apiRouter };
