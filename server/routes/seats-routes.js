
const router = require("express").Router();
const Seat = require("../models/Seat");

router.post("/seats", async (req, res) => {
    try {
      
      const newSeat = new Seat(req.body);
  
    
      const savedSeat = await newSeat.save();
  

      res.status(201).json(savedSeat);
    } catch (error) {
   
        res.send({
            success: false,
            message: error.message,
          });
    }
  });
  

  module.exports = router;


