const router = require("express").Router();
const Show = require("../models/showModel")
const Checkout = require("../models/checkoutModel")
const User = require("../models/userModel");
const EmailAdapter = require('../adapter/adapter');

const emailAdapter = new EmailAdapter({
  user: 'csci4050@outlook.com',
  pass: 'teamteama1'
});

router.post("/checkout-show", async (req, res) => {
  try {

    const newCheckout = new Checkout(req.body);
    await newCheckout.save();

    const show = await Show.findById(req.body.show);
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    const user = await User.findOne({ _id: req.body.user });

    const emailOptions = {
      from: 'csci4050@outlook.com',
      to: user.email,
      subject: 'Order Comfirmation Email',
      html: '<p>Thank you for order!</p>' +
        '<p>Comfirmation code: </p>' + newCheckout.transactionId,
      text: 'This is text version!'
    };

    await emailAdapter.sendMail(emailOptions);

    res.send({
      success: true,
      message: "Ticket booked successfully",
      data: newCheckout,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});





router.get("/get-tickets/:userId", async (req, res) => {
  try {
    const checkouts = await Checkout.find({ user: req.params.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user");

    res.send({
      success: true,
      message: "tickets fetched successfully",
      data: checkouts,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;