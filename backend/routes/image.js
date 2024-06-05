const { Router } = require("express");
const upload = require("../middlewares/file.upload.mw");
const ImageController = require("../controller/image");
const paginate = require("../middlewares/paginate.mw");

const imageRouter = Router();

imageRouter.post("/:heroId", upload, ImageController.createImages);
imageRouter.get("/", paginate, ImageController.getAllImages);
imageRouter.delete("/:imageId", ImageController.deleteImage);

module.exports = imageRouter;
