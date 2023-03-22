const express = require("express")
const seatController = require("../controllers/seats-controller")
const router = express.Router()

router.post("/seat", seatController.addSeat);

module.exports = router;