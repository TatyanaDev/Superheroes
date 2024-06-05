const { Router } = require("express");
const superpowerRouter = require("./superpower");
const superheroRouter = require("./superhero");
const imageRouter = require("./image");

const router = Router();

router.use("/superheroes", superheroRouter);
router.use("/superpowers", superpowerRouter);
router.use("/images", imageRouter);

module.exports = router;
