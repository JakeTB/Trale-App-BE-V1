const users = require("./users");
const pubs = require("./pubs");
const routes = require("./routes");
const user_routes = require("./user_routes");
const developmentData = {
  pubsData: pubs,
  usersData: users,
  routesData: routes,
  user_routesData: user_routes
};
module.exports = developmentData;
