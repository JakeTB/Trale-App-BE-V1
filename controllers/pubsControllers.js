const { getAllPubs, getSinglePub } = require("../models/pubsModels");

exports.sendAllPubs = (req, res, next) => {
  getAllPubs().then(pubs => {
    res.status(200).send({ pubs });
  });
};

exports.sendSinglePub = (req, res, next) => {
  getSinglePub(req.params).then(response => {
    const pub = response[0]
    res.status(200).send({ pub })
  }).catch(next)
}
