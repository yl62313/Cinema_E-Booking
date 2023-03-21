const express = require("express")
const promotionController = require("../controllers/promotions-controller")
const router = express.Router()

router.post("/promotion", promotionController.addPromotion);

module.exports = router;