const apiRouter = require("express").Router();
const { userRouter } = require("./userRouter");
const { pubsRouter } = require("./pubsRouter");
apiRouter.route("/").get((req, res, next) => {
  res.status(200).send({ message: "Hello" });
});
apiRouter.use("/users", userRouter);
apiRouter.use("/pubs", pubsRouter);
module.exports = { apiRouter };
