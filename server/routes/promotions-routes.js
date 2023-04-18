const express = require("express")
const Promotion = require("../models/Promotion");
const User = require("../models/userModel");
const router = express.Router()
const EmailAdapter = require("../adapter/adapter");

const emailAdapter = new EmailAdapter({
  user: 'csci4050@outlook.com',
  pass: 'teamteama1'
});

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

    const subscribedUsers = await User.find({ isSubscribed: true });
    const recipients = subscribedUsers.map(user => user.email);

    const savedPromotion = await createdPromotion.save();

    const emailOptions = {
      from: 'csci4050@outlook.com',
      to: recipients,
      subject: 'We Have Promotion For You',
      html: '<p>Promotion name: ' + name
        + '<p>Promotion code: ' + code
        + '<p>Beginning on: ' + startDate
        + '<p>Until: ' + endDate
        + '<p>Use the code when booking to get a ' + discount + '% discount off your order</p>',
      text: 'This is text version!',
    };

    await emailAdapter.sendMail(emailOptions);

    

    // nodeoutlook.sendEmail({
    //   auth: {
    //     user: "aobooking@outlook.com",
    //     pass: "teamteama1"
    //   },
    //   from: 'aobooking@outlook.com',
    //   to: recipients,
    //   subject: 'We Have Promotion For You',
    //   html: '<p>Promotion name: ' + name
    //     + '<p>Promotion code: ' + code
    //     + '<p>Beginning on: ' + startDate
    //     + '<p>Until: ' + endDate
    //     + '<p>Use the code when booking to get a ' + discount + '% discount off your order</p>',
    //   text: 'This is text version!',
    //   onError: (e) => console.log(e),
    //   onSuccess: (i) => console.log(i)
    // });


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



router.get('/bring-promotion', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.send({
      success: true,
      message: "Movies fetched successful",
      data: promotions,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post('/edit-promotion', async (req, res) => {
  try {
    await Promotion.findByIdAndUpdate(req.body.movieId, req.body)
    res.send({
      success: true,
      message: "Promotion updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post('/delete-promotion', async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.body.promotionId)
    res.send({
      success: true,
      message: "Promotion deleted"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
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