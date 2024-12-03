const { Router } = require("express");
const SuperpowerController = require("../controller/superpower");
const paginateMw = require("../middlewares/paginate.mw");

const superpowerRouter = Router();

superpowerRouter.get("/", paginateMw, SuperpowerController.getAllSuperpowers);
superpowerRouter.delete("/:id", SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
