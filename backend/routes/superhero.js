const { Router } = require("express");
const parseMultipartRequestMw = require("../middlewares/parse.multipart.request.mw");
const checkHeroExistenceMw = require("../middlewares/check.hero.existence.mw");
const SuperheroController = require("../controller/superhero");
const paginateMw = require("../middlewares/paginate.mw");

const superheroRouter = Router();

superheroRouter
  .route("/")
  .post(parseMultipartRequestMw, SuperheroController.createSuperhero)
  .get(paginateMw, SuperheroController.getAllSuperheroes);

superheroRouter
  .route("/:id")
  .patch(
    checkHeroExistenceMw,
    parseMultipartRequestMw,
    SuperheroController.updateSuperhero
  )
  .delete(checkHeroExistenceMw, SuperheroController.deleteSuperhero);

module.exports = superheroRouter;
