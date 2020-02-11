exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = {
    "22P02": {
      status: 400,
      message: "Bad Request, invalid syntax, id should be an number"
    },
    "23503": { status: 400, message: "Bad request, that id does not exist" },
    "23505": { status: 400, message: "That value is not unique" }
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
