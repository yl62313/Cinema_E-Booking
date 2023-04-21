
const Booking = require('../models/Booking');
const express = require('express');
const router = express.Router();

router.post('/ticket', async (req, res) => {
  try {
    const { selectedSeat, totalPrice } = req.body;

    const newBooking = new Booking({
      tickets: selectedSeat,
      totalPrice: totalPrice
    });

    await newBooking.save();

    res.send({
      success: true,
      message: "Success"
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

