const {
  SendAllUsers,
  SendSingleUser,
  UpdateSingleUser,
  createNewUser
} = require("../controllers/usersController");

const userRouter = require("express").Router();

userRouter.route("/").get(SendAllUsers).post(createNewUser)
userRouter
  .route("/:id")
  .get(SendSingleUser)
  .patch(UpdateSingleUser)
module.exports = { userRouter };