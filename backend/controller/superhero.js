const createError = require("http-errors");
const { Superhero, Superpower, Image } = require("../models");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {
      body,
      body: { powerName, imagePath },
    } = req;

    const createdSuperhero = await Superhero.create(body);
    const { id } = createdSuperhero;

    if (!id) {
      return next(createError(400, "Error when creating a hero"));
    }

    const superpowers = await Superpower.bulkCreate(
      powerName.map((stringSuperpowers) => ({
        powerName: stringSuperpowers,
        heroId: id,
      }))
    );

    if (!superpowers) {
      return next(createError(400, "Error while creating super powers"));
    }

    const images = await Image.bulkCreate(
      imagePath.map((stringImages) => ({
        imagePath: stringImages,
        heroId: id,
      }))
    );

    if (!images) {
      return next(createError(400, "Error while creating images"));
    }

    res.status(201).send({
      data: [
        {
          ...createdSuperhero.get(),
          superpowers,
          images,
        },
      ],
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
          attributes: ["id", "powerName"],
        },
        {
          model: Image,
          attributes: ["id", "imagePath"],
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
    const {
      params: { id },
      body,
    } = req;

    const { powerName, imagePath } = body;

    const [rowsCount, [updatedSuperhero]] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });

    await Superpower.bulkCreate(
      powerName.map((stringSuperpowers) => ({
        powerName: stringSuperpowers,
        heroId: id,
      }))
    );

    await Image.bulkCreate(
      imagePath.map((stringImages) => ({
        imagePath: stringImages,
        heroId: id,
      }))
    );

    if (rowsCount !== 1) {
      return next(createError(400, "Superhero can't be updated"));
    }

    res.send({ data: { updatedSuperhero } });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;

    const rowsCount = await Superhero.destroy({
      where: { id: superheroId },
    });

    if (!rowsCount) {
      return next(createError(404, "Superhero not found"));
    }

    res
      .status(200)
      .send({ data: `${rowsCount} Superhero successfully deleted` });
  } catch (err) {
    next(err);
  }
};
