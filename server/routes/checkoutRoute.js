const router = require("express").Router();
const Show = require("../models/showModel")
const Checkout = require("../models/checkoutModel")
const Booking = require('../models/Booking');



router.post("/checkout-show", async (req, res) => {
  try {
    // const newCheckout = new Checkout(req.body);
    // await newCheckout.save();

    // const show = await Show.findById(req.body.show);
    // await Show.findByIdAndUpdate(req.body.show, {
    //   bookedSeats: [...show.bookedSeats, ...req.body.seats],
    // });

    const { seats, totalPrice } = req.body;

    
    const newBooking = new Booking({
      seats: seats,
      totalPrice: totalPrice
    });

    await newBooking.save();


    res.send({
      success: true,
      message: "Ticket booked successfully",
      
    });
  } catch (error) {
    // console.log('checkout error:',error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// router.post("/make-payment", async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const charge = await charges.create({
//       amount: amount,
//       currency: "usd",
//       description: "Ticket Booked for Movie",
//     });
//     const transactionId = charge.id;
//     res.send({
//       success: true,
//       message: "Payment successful",
//       data: transactionId,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

router.get("/get-tickets", async (req, res) => {
  try {
    const tickets = await Checkout.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })

    res.send({
      success: true,
      message: "tickets fetched successfully",
      data: tickets,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;