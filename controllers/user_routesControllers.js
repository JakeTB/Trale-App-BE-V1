const { postUserRoute } = require("../models/user_routesModels");

exports.sendAllUserRoutes = (req, res, next) => {};
exports.createUserRoutes = (req, res, next) => {
  console.log("inside controller");
  console.log(req.body);
  postUserRoute(req.body).then(userRoute => {
    console.log(userRoute);
    res.status(201).send({ userRoute });
  });
};
