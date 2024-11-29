const { Router } = require("express");
const SuperheroController = require("../controller/superhero");
const paginate = require("../middlewares/paginate.mw");

const superheroRouter = Router();

superheroRouter
  .route("/")
  .post(SuperheroController.createSuperhero)
  .get(paginate, SuperheroController.getAllSuperheroes);

superheroRouter
  .route("/:id")
  .patch(SuperheroController.updateSuperhero)
  .delete(SuperheroController.deleteSuperhero);

module.exports = superheroRouter;
