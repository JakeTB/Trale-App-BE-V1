const apiRouter = require("express").Router();
apiRouter.route("/").get((req, res, next) => {
  res.status(200).send({ message: "Hello" });
});
module.exports = { apiRouter };
