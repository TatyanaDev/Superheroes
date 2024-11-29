const createError = require("http-errors");
const { Superhero, Superpower, Image } = require("../models");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;

    const superhero = await Superhero.create(body);

    if (!superhero) {
      return next(createError(400, "Error creating superhero"));
    }

    // Create superpowers
    if (!body.superpowers?.length) {
      return next(createError(400, "Superpowers data is missing or invalid"));
    }

    const superpowers = await Superpower.bulkCreate(
      body.superpowers.map((superpower) => ({
        superpower,
        heroId: superhero.id,
      }))
    );

    if (!superpowers) {
      return next(createError(400, "Error creating superpowers"));
    }

    // Create images
    if (!body.images?.length) {
      return next(createError(400, "Images data is missing or invalid"));
    }

    const images = await Image.bulkCreate(
      body.images.map((image) => ({
        image,
        heroId: superhero.id,
      }))
    );

    if (!images) {
      return next(createError(400, "Error creating images"));
    }

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
    const { id } = req.params;
    const { superpowers, images } = req.body;

    const [, [updatedSuperhero]] = await Superhero.update(req.body, {
      where: { id },
      returning: true,
    });

    await Superpower.destroy({ where: { heroId: id } });
    await Superpower.bulkCreate(
      superpowers.map((superpower) => ({
        superpower,
        heroId: id,
      }))
    );

    await Image.destroy({ where: { heroId: id } });
    await Image.bulkCreate(
      images.map((image) => ({
        image,
        heroId: id,
      }))
    );

    if (!updatedSuperhero) {
      return next(createError(400, "Error updating superhero"));
    }

    res.status(200).send({ data: updatedSuperhero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsCount = await Superhero.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createError(404, "Superhero not found"));
    }

    res
      .status(200)
      .send({ message: `Superhero ${id} has successfully deleted` });
  } catch (err) {
    next(err);
  }
};
