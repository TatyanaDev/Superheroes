const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const { createPublicFolder } = require("../utils/create.public.folder");
const { fileTypeFromBuffer } = require("file-type");
const { STATIC_PATH } = require("../config/config");

const pathToImages = path.resolve(STATIC_PATH, "images");
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
}).array("images", 10);

const uploadImages = (req, res, next) =>
  upload(req, res, async (err) => {
    if (err) {
      return next(createError(400, err.message || "Error uploading image"));
    }

    if (!req.files || !req.files.length) {
      return next(createError(400, "At least one image is required"));
    }

    try {
      await createPublicFolder(pathToImages);

      for (const file of req.files) {
        const type = await fileTypeFromBuffer(file.buffer);

        if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
          return next(
            createError(
              400,
              "Invalid images format. Must be a JPEG, PNG or WEBP image"
            )
          );
        }

        const ext = `.${type.ext}`;
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        const filePath = path.join(pathToImages, uniqueName);

        await fs.writeFile(filePath, file.buffer);
        file.filename = uniqueName;
      }

      next();
    } catch (e) {
      return next(createError(500, "Error saving image"));
    }
  });

module.exports = uploadImages;
