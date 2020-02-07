const {
  getAllPubs,
  getSinglePub,
  patchSinglePub,
  addNewPub
} = require("../models/pubsModels");

exports.sendAllPubs = (req, res, next) => {
  getAllPubs(req.query).then(pubs => {
    res.status(200).send({ pubs });
  });
};

exports.sendSinglePub = (req, res, next) => {
  getSinglePub(req.params)
    .then(response => {
      const pub = response[0];
      res.status(200).send({ pub });
    })
    .catch(next);
};
exports.updateSinglePub = (req, res, next) => {
  patchSinglePub(req.params, req.body).then(response => {
    const updatedPub = response[0];
    res.status(201).send({ updatedPub });
  });
};

exports.createNewPub = (req, res, next) => {
  addNewPub(req.body).then(pub => {
    res.sendStatus(201);
  });
};
