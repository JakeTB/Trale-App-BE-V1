const express = require("express");
const app = express();
const cors = require("cors");
const { apiRouter } = require("./routers/apiRouter");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.all("/*", (req, res, next) =>
  res.status(404).send({ message: "Route not found" })
);
module.exports = { app };
