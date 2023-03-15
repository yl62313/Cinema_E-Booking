const express = require("express");
const addressController = require("../controllers/addresses-controller");
const router = express.Router();

router.post("/address", addressController.addAddress);

module.exports = router;