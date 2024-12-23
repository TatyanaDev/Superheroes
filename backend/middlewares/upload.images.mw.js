const multer = require("multer");
const path = require("path");
const { createPublicFolder } = require("../utils/create.public.folder");
const { STATIC_PATH } = require("../config/config");

const pathToImages = path.resolve(STATIC_PATH, "images");

createPublicFolder(pathToImages);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pathToImages),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const uploadImages = multer({ storage });

module.exports = uploadImages.array("images", 10);
