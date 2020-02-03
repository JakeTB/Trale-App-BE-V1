const apiRouter = require("express").Router();
const { userRouter } = require("./userRouter");
apiRouter.route("/").get((req, res, next) => {
  res.status(200).send({ message: "Hello" });
});
apiRouter.use("/users", userRouter);
module.exports = { apiRouter };
