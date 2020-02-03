const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.all("/*", (req, res, next) =>
  res.status(404).send({ message: "Route not found" })
);
module.exports = { app };
