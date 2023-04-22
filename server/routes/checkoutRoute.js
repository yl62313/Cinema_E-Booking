const router = require("express").Router();
const Show = require("../models/showModel")
const Checkout = require("../models/checkoutModel")



router.post("/checkout-show", async (req, res) => {
    try {
      const newCheckout = new Checkout(req.body);
      await newCheckout.save();
  
      const show = await Show.findById(req.body.show);
      await Show.findByIdAndUpdate(req.body.show, {
        bookedSeats: [...show.bookedSeats, ...req.body.seats],
      });
 
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




router.get("/get-tickets", async (req, res) => {
    try {
      const checkouts = await Checkout.find({user: req.body.userId})
      .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "movies",
          },
        })
        .populate("user")
        .populate({
          path: "show",
        })

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