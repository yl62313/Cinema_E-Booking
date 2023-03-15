const express = require("express")
const paymentCardController = require("../controllers/paymentCards-controller")
const router = express.Router()

router.post("/paymentCard", paymentCardController.addCard);

module.exports = router;