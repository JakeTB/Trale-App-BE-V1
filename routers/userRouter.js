const { SendAllUsers } = require("../controllers/usersController");
const userRouter = require("express").Router();
userRouter.route("/").get(SendAllUsers);
module.exports = { userRouter };
