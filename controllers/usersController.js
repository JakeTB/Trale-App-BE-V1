const { getAllUsers, getSingleUser } = require("../models/usersModels");

exports.SendAllUsers = (req, res, next) => {
  getAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(error => {});
};
exports.SendSingleUser = (req, res, next) => {
  getSingleUser(req.params).then(response => {
    const user = response[0];
    res.status(200).send({ user });
  });
};
