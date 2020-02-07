exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = {
    "22P02": {
      status: 400,
      message: "Bad Request, invalid syntax, id should be an number"
    },
    "23503": { status: 400, message: "Bad request, that id does not exist" }
  };

  if (Object.keys(psqlCodes).includes(err.code)) {
    const { status, message } = psqlCodes[err.code];
    res.status(status).send({ message });
  } else {
    next(err);
  }
};
exports.customErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
};
