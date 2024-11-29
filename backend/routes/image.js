const { Router } = require("express");
const checkHeroExistence = require("../middlewares/check.hero.existence.mw");
const upload = require("../middlewares/file.upload.mw");
const ImageController = require("../controller/image");
const paginate = require("../middlewares/paginate.mw");

const imageRouter = Router();

imageRouter.post(
  "/:heroId",
  checkHeroExistence,
  upload,
  ImageController.createImages
);
imageRouter.get("/", paginate, ImageController.getAllImages);
imageRouter.delete("/:id", ImageController.deleteImage);

module.exports = imageRouter;
