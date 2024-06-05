const { env } = require("process");
const path = require("path");

module.exports = {
  STATIC_PATH: env.STATIC_PATH || path.resolve(__dirname, "../public"),
  DB_CONFIG: path.resolve(__dirname, "db.json"),
};
