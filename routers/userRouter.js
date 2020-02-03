const {
  SendAllUsers,
  SendSingleUser,
  UpdateSingleUser
} = require("../controllers/usersController");
const userRouter = require("express").Router();
userRouter.route("/").get(SendAllUsers);
userRouter
  .route("/:id")
  .get(SendSingleUser)
  .patch(UpdateSingleUser);
module.exports = { userRouter };
