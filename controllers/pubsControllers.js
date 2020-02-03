const { getAllPubs } = require("../models/pubsModels");

exports.sendAllPubs = (req, res, next) => {
  getAllPubs().then(pubs => {
    res.status(200).send({ pubs });
  });
};
