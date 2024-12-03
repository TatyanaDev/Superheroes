const createError = require("http-errors");
const uploadImagesMw = require("./upload.images.mw");

const parseMultipartRequest = (req, res, next) => {
  uploadImagesMw(req, res, (err) => {
    if (err) {
      return next(createError(400, "File upload error"));
    }

    if (req.body.superpowers) {
      try {
        req.body.superpowers = JSON.parse(req.body.superpowers);

        if (!Array.isArray(req.body.superpowers)) {
          return next(
            createError(400, "Superpowers must be a valid JSON array")
          );
        }
      } catch (err) {
        return next(
          createError(
            400,
            "Invalid superpowers format. Must be a valid JSON array."
          )
        );
      }
    }

    if (!req.body.nickName) {
      return next(createError(400, "Nickname is required"));
    }

    if (!req.body.superpowers || !req.body.superpowers.length) {
      return next(createError(400, "Superpowers are required"));
    }

    if (!req.files || req.files.length === 0) {
      return next(createError(400, "At least one image is required"));
    }

    next();
  });
};

module.exports = parseMultipartRequest;
