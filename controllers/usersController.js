const {
  getAllUsers,
  getSingleUser,
  patchSingleUser,
  addNewUser
} = require("../models/usersModels");

exports.SendAllUsers = (req, res, next) => {
  getAllUsers(req.query)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
exports.SendSingleUser = (req, res, next) => {
  getSingleUser(req.params)
    .then(response => {
      const user = response[0];
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.UpdateSingleUser = (req, res, next) => {
  patchSingleUser(req.params, req.body)
    .then(response => {
      const updatedUser = response[0];
      res.status(201).send({ updatedUser });
    })
    .catch(next);
};

exports.createNewUser = (req, res, next) => {
  addNewUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};
