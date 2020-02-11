const connection = require("../db/connection");
exports.getAllUsers = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .modify(query => {
      if (username) query.where("users.username", username);
    })
    .then(users => {
      return users;
    });
};

exports.getSingleUser = params => {
  const { id } = params;
  return connection
    .select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user[0]) return user;
      else {
        return Promise.reject({
          message: "That id does not exist",
          status: 404
        });
      }
    });
};
exports.patchSingleUser = (params, body) => {
  const { id } = params;
  const { avatar } = body;
  return connection
    .select("*")
    .from("users")
    .where({ id })
    .update({ avatar })
    .returning("*");
};

exports.addNewUser = user => {
  console.log("Incoming users", user);
  if (!user.username) {
    return Promise.reject({
      message: "No username in request body",
      status: 400
    });
  }
  const newUser = {
    username: user.username,
    avatar: user.avatar,
    bio: user.bio,
    active_route: user.active_route,
    completed_route: user.completed_route
  };

  return connection
    .insert(newUser)
    .into("users")
    .returning("*")
    .then(user => {
      return user[0];
    });
};
