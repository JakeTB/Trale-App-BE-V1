const apiRouter = require("express").Router();
const { userRouter } = require("./userRouter");
const { pubsRouter } = require("./pubsRouter");
const { routesRouter } = require("./routesRouter")
apiRouter.route("/").get((req, res, next) => {
  res.status(200).send({ message: "Hello" });
});
apiRouter.use("/users", userRouter);
apiRouter.use("/pubs", pubsRouter);
apiRouter.use("/routes", routesRouter)
module.exports = { apiRouter };
