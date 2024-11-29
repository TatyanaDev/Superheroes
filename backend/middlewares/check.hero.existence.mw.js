const { Superhero } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { heroId } = req.params;

    const superhero = await Superhero.findByPk(heroId);

    if (!superhero) {
      return res
        .status(404)
        .send({ message: `Superhero with id ${heroId} not found` });
    }

    next();
  } catch (err) {
    next(err);
  }
};
