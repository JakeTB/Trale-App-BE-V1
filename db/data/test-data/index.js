const users = require("./users");
const pubs = require("./pubs");
const routes = require("./routes");
const user_routes = require("./user_routes");
const testData = {
  userData: users,
  routesData: routes,
  pubsData: pubs,
  user_routesData: user_routes
};
module.exports = testData;
