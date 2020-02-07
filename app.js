const express = require("express");
const app = express();
const cors = require("cors");
const { apiRouter, userLogin } = require("./routers/apiRouter");
const { psqlErrors, customErrors } = require("./errors/index");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use(psqlErrors);
app.use(customErrors);
app.all("/*", (req, res, next) =>
  res.status(404).send({ message: "Route not found" })
);
module.exports = { app };
