const express = require("express")
const showRoomController = require("../controllers/showRooms-controller")
const router = express.Router()

router.post("/showRoom", showRoomController.addRoom);

module.exports = router;