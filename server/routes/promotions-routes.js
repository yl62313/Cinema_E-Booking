const express = require("express")
const Promotion = require("../models/Promotion");
const router = express.Router()

router.post("/addPromotion", async (req, res) => {
  const { name, code, discount, startDate, endDate } = req.body;

  if (new Date(startDate) > new Date(endDate)) {
    return res.send({
      success: false,
      message: "Start date cannot be later than end date",
    });
  }
  
  const createdPromotion = new Promotion({
    name,
    code,
    discount,
    startDate,
    endDate,
  });

  try {
    const savedPromotion = await createdPromotion.save();
    return res.send({
      success: true,
      message: "Created Promotion",
      promotion: savedPromotion,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.send({
        success: false,
        message: "Promotion code already exists",
      });
    }
    return res.send({
      success: false,
      message: error.message,
    });
  }
});



  router.get('/bring-promotion',async(req,res)=> {
    try{
        const promotions = await Promotion.find();
        res.send({
            success: true,
            message: "Movies fetched successful",
            data: promotions,
        });
    } catch (error){
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.post('/edit-promotion', async(req,res)=> {
    try {
        await Promotion.findByIdAndUpdate(req.body.movieId, req.body)
        res.send({
            success: true,
            message: "Promotion updated",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.post('/delete-promotion', async(req,res)=> {
    try {
        await Promotion.findByIdAndDelete(req.body.promotionId)
        res.send({
            success: true,
            message: "Promotion deleted"
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

router.get("/get-promotion-by-id/:id", async (req, res) => {
    try {
      const promotion = await Promotion.findById(req.params.id);
      res.send({
        success: true,
        message: "Promotion fetched successfully",
        data: movie,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
module.exports = router;