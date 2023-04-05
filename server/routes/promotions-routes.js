const express = require("express")
const Promotion = require("../models/Promotion");
const router = express.Router()

router.post("/addPromotion", async (req, res) => {
    const { name, code, discount, startDate, endDate } = req.body;
    const createdPromotion = new Promotion({
      name,
      code,
      discount,
      startDate,
      endDate
    });

    // try {
    //   createdPromotion.save();
    // } catch (error) {  
    //   res.send({
    //     success: false,
    //     message: error.message,
    //   })
    // }

    if (createdPromotion.save()) {
      return res.send({
        success: true,
        message: "Created Promotion",
      });
    } else {
      res.send({
            success: false,
            message: error.message,
          })
    }

    
  
  //   try {
  //     await createdPromotion.save();
  //   } catch (err) {
  //     console.log(err.message);
  //    return res.status(500).json({message: "Could not create promotion."});
  //   }
  //   res.status(201).json({ promotion: createdPromotion });
  })

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