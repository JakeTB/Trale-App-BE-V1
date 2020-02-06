const userLogin = require("express").Router();
const CognitoExpress = require("cognito-express");
const cognitoExpress = new CognitoExpress({
  region: "eu-west-2",
  cognitoUserPoolId: "eu-west-2_tVLUSahbs",
  tokenUse: "access",
  tokenExpiration: 3600000
});
userLogin.use((req, res, next) => {
  const { usertoken } = req.headers;
  if (!usertoken)
    return res.status(401).send("Access token missing from header.");
  cognitoExpress.validate(usertoken, (err, response) => {
    if (err) return res.status(401).send(err);
    res.locals.user = response;
    next();
  });
});
module.exports = userLogin;
