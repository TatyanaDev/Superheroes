const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middlewares/error.handlers.js');
const { STATIC_PATH } = require('./config/config.js');
const app = express();

app.use(express.static(STATIC_PATH));
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

module.exports = app;
