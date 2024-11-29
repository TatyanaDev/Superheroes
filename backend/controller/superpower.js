const createError = require("http-errors");
const { Superpower } = require("../models");

module.exports.getAllSuperpowers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const superpowers = await Superpower.findAll({ ...pagination });

    if (!superpowers.length) {
      return next(createError(404, "Superpowers not found"));
    }

    res.status(200).send({
      data: superpowers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsCount = await Superpower.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createError(404, "Superpower not found"));
    }

    res
      .status(200)
      .send({ message: `Superpower ${id} has successfully deleted` });
  } catch (err) {
    next(err);
  }
};
