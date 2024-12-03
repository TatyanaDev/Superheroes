const createError = require("http-errors");
const { omitSuperpowers } = require("../utils/omit.superpowers");
const { Superhero, Superpower, Image } = require("../models");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const superhero = await Superhero.create({
      ...omitSuperpowers(body),
    });

    const superpowers = await Superpower.bulkCreate(
      body.superpowers.map((superpower) => ({
        superpower,
        heroId: superhero.id,
      }))
    );

    const images = await Image.bulkCreate(
      files.map((file) => ({
        image: `/images/${file.filename}`,
        heroId: superhero.id,
      }))
    );

    res.status(201).send({
      data: {
        ...superhero.toJSON(),
        superpowers,
        images,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const superheroes = await Superhero.findAll({
      ...pagination,
      include: [
        {
          model: Superpower,
          as: "superpowers",
          attributes: ["id", "superpower"],
        },
        {
          model: Image,
          as: "images",
          attributes: ["id", "image"],
        },
      ],
    });

    if (!superheroes.length) {
      return next(createError(404, "Superheroes not found"));
    }

    res.status(200).send({
      data: superheroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const { params, body, files } = req;
    const { id } = params;

    const [, [updatedSuperhero]] = await Superhero.update(
      omitSuperpowers(req.body),
      {
        where: { id },
        returning: true,
      }
    );

    await Superpower.destroy({ where: { heroId: id } });
    const superpowers = await Superpower.bulkCreate(
      body.superpowers.map((superpower) => ({
        superpower,
        heroId: id,
      }))
    );

    await Image.destroy({ where: { heroId: id } });
    const images = await Image.bulkCreate(
      files.map((file) => ({
        image: `/images/${file.filename}`,
        heroId: id,
      }))
    );

    if (!updatedSuperhero) {
      return next(createError(400, "Error updating superhero"));
    }

    res.status(200).send({
      data: {
        ...updatedSuperhero.toJSON(),
        superpowers,
        images,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Superhero.destroy({ where: { id } });

    res
      .status(200)
      .send({ message: `Superhero ${id} has successfully deleted` });
  } catch (err) {
    next(err);
  }
};
