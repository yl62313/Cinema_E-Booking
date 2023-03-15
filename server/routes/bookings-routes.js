const express = require("express");
const bookingController = require("../controllers/bookings-controller");
const router = express.Router();

router.post("/booking", bookingController.addBooking);

module.exports = router;
