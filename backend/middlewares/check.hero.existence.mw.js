const createError = require("http-errors");
const { Superhero } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const heroId = req.params.id || req.params.heroId;

    if (!heroId) {
      return next(createError(400, "Superhero ID is required"));
    }

    const superhero = await Superhero.findByPk(heroId);

    if (!superhero) {
      return next(createError(404, `Superhero with id ${heroId} not found`));
    }

    next();
  } catch (err) {
    next(err);
  }
};
