const pubsRouter = require("express").Router();
const { sendAllPubs } = require("../controllers/pubsControllers");
pubsRouter.route("/").get(sendAllPubs);
module.exports = { pubsRouter };
