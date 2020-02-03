const {
  SendAllUsers,
  SendSingleUser
} = require("../controllers/usersController");
const userRouter = require("express").Router();
userRouter.route("/").get(SendAllUsers);
userRouter.route("/:id").get(SendSingleUser);
module.exports = { userRouter };
