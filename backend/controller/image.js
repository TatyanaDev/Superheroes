const createError = require("http-errors");
const { Superhero, Image } = require("../models");

module.exports.createImages = async (req, res, next) => {
  try {
    const { heroId } = req.params;

    const images = await Image.bulkCreate(
      req.files.map((file) => ({
        image: file.filename,
        heroId,
      }))
    );

    res.status(201).send({ data: images });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllImages = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const images = await Image.findAll({ ...pagination });

    if (!images.length) {
      return next(createError(404, "Images not found"));
    }

    res.status(200).send({
      data: images,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsCount = await Image.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createError(404, "Image not found"));
    }

    res.status(200).send({ message: `Image ${id} has successfully deleted` });
  } catch (err) {
    next(err);
  }
};
