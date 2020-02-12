const {
  SendAllUsers,
  SendSingleUser,
  UpdateSingleUser,
  createNewUser,
  RemoveSingleUser
} = require("../controllers/usersController");

const userRouter = require("express").Router();
console.log("USER ROUTER");
userRouter
  .route("/")
  .get(SendAllUsers)
  .post(createNewUser);
userRouter
  .route("/:id")
  .get(SendSingleUser)
  .patch(UpdateSingleUser)
  .delete(RemoveSingleUser);

module.exports = { userRouter };
