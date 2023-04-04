const express = require("express")
const promotionController = require("../controllers/promotions-controller")
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
  
    try {
      await createdPromotion.save();
    } catch (err) {
      const error = new HttpError(
        'Creating promotion failed, please try again.',
        500
      );
      console.log(err.message);
      return next(error);
    }
    res.status(201).json({ promotion: createdPromotion });
  })

module.exports = router;