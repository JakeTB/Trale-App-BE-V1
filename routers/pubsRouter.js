const pubsRouter = require("express").Router();
const { sendAllPubs, sendSinglePub, updateSinglePub, createNewPub } = require("../controllers/pubsControllers");
pubsRouter.route("/").get(sendAllPubs).post(createNewPub)
pubsRouter
  .route("/:id")
  .get(sendSinglePub)
  .patch(updateSinglePub)
module.exports = { pubsRouter };
