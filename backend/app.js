const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.handler.js");
const { STATIC_PATH } = require("./config/config.js");
const router = require("./routes/index.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(express.static(STATIC_PATH));

app.use(errorHandler);

module.exports = app;
