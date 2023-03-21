const express = require("express");
const movieController = require("../controllers/movies-controller");
const router = express.Router();

router.post("/movie", movieController.addMovie);

module.exports = router;