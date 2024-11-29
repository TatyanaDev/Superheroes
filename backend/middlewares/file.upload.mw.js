const multer = require("multer");
const path = require("path");
const { STATIC_PATH } = require("../config/config");
const { createPublicFolder } = require("../utils");

const pathToImages = path.resolve(STATIC_PATH, "images");

createPublicFolder(pathToImages);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pathToImages),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

module.exports = upload.array("images", 10);
