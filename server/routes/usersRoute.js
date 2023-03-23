const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
var nodeoutlook = require('nodejs-nodemailer-outlook')

router.post("/register", async (req, res) => {
  try {


    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    if (req.body.cardNumber != null) {
      const hashedCardNumber = await bcrypt.hash(req.body.cardNumber, salt);
      req.body.cardNumber = hashedCardNumber;
    }


    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Verfication code sent to email"

    });



    code = Math.floor(Math.random() * (99999 - 10000))

    nodeoutlook.sendEmail({
      auth: {
        user: "yl205205@outlook.com",
        pass: "teamteama1"
      },
      from: 'yl205205@outlook.com',
      to: req.body.email,
      subject: 'Verification Email',
      html: '<p>Thank you for registering with us. Before you can proceed, please enter the given verification code: </p>' + code
      +  '<p><a href=http://localhost:8081/confirm/${confirmationCode}> Click here to verify</a></p>',
      text: 'This is text version!',
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
    },

      router.post("/verify", async (req, res) => {
        let userCode = req.params.code;

        if (userCode == code) {
          newUser.userStatus = "ACTIVE";
        } else {
          return res.status(401).json({
            message: "Codes do not match."
          });
        }
      })
    );



  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }


    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    if (user.userStatus == "INACTIVE") {
      return res.status(401).json({
        message: "Account is inactive."
      })
    } else if (user.userStatus == "SUSPENDED") {
      return res.status(401).json({
        message: "Account is suspended."
      })
    } else {
      const token = jwt.sign({ userId: user._id }, '$process.env.jwt_secret', {
        expiresIn: "5h",
      });
      user.token = token;

      res.send({
        success: true,
        message: "User logged in successful",
        data: token,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("current-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User fetched",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})

router.patch("/editProfile", auth, async (req, res) => {
  if (localStorage.getItem("token")) {
    try {
      const user = await User.findById(req.body.userId);
    }
    catch (error) {
      console.log(error.message)
    }
    if (req.body.currentPassword == req.body.newPassword) {
      return res.status(400).json({ message: "Passwords cannot be the same" })
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.password = req.body.password;
      user.street = req.body.street;
      user.state = req.body.state;
      user.city = req.body.city;
      user.zipCode = req.body.zipCode;
      user.phoneNumber = req.body.phoneNumber;
      user.cardNumber = req.body.cardNumber;
      user.nameOnCard = req.body.nameOnCard;
      user.exp = req.body.exp;
    }
    try {
      await user.save();
      res.status(201).json({ message: "Profile successfully updated" });
    }
    catch (error) {
      console.log(error.message)
    }
  }
})

module.exports = router;