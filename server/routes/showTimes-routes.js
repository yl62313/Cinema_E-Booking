const express = require("express")
const showTimeController = require("../controllers/showTimes-controller")
const router = express.Router()

router.post("/showTime", showTimeController.addTime);

module.exports = router;