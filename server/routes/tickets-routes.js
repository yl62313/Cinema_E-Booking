const express = require("express")
const ticketController = require("../controllers/tickets-controller")
const router = express.Router()

router.post("/ticket", ticketController.addTicket);

module.exports = router;