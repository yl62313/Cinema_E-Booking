const express = require("express")
const showController = require("../controllers/shows-controller")
const router = express.Router()

router.post("/show", showController.addShow);

module.exports = router;