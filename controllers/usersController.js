const { getAllUsers } = require("../models/usersModels");

exports.SendAllUsers = (req, res, next) => {
  getAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(error => {});
};
