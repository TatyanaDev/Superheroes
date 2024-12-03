const { Router } = require("express");
const checkHeroExistenceMw = require("../middlewares/check.hero.existence.mw");
const uploadImagesMw = require("../middlewares/upload.images.mw");
const ImageController = require("../controller/image");
const paginateMw = require("../middlewares/paginate.mw");

const imageRouter = Router();

imageRouter.post(
  "/:heroId",
  checkHeroExistenceMw,
  uploadImagesMw,
  ImageController.createImages
);
imageRouter.get("/", paginateMw, ImageController.getAllImages);
imageRouter.delete("/:id", ImageController.deleteImage);

module.exports = imageRouter;
