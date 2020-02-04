const pubsRouter = require("express").Router();
const { sendAllPubs, sendSinglePub } = require("../controllers/pubsControllers");
pubsRouter.route("/").get(sendAllPubs);
pubsRouter
  .route("/:id")
  .get(sendSinglePub)
module.exports = { pubsRouter };
