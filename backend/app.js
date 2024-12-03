const express = require("express");
const cors = require("cors");
const errorHandlerMw = require("./middlewares/error.handler.mw");
const { STATIC_PATH } = require("./config/config");
const router = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(express.static(STATIC_PATH));

app.use(errorHandlerMw);

module.exports = app;
