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

    newUser.confirmationCode = code;

    try {
      await newUser.save()

    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }


    nodeoutlook.sendEmail({
      auth: {
        user: "aobooking@outlook.com",
        pass: "teamteama1"
      },
      from: 'aobooking@outlook.com',
      to: req.body.email,
      subject: 'Verification Email',
      html: '<p>Thank you for registering with us. Before you can proceed, please enter the given verification code: </p>' + code
        + '<p><a href=http://localhost:3000/Auth> Click here to verify</a></p>',
      text: 'This is text version!',
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
    },
    );



  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/Auth", async (req, res) => {
  const userEmail = req.body.email;
  const userCode = req.body.confirmationCode;

  let updatedUser;
  try {
    updatedUser = User.findOne({ email: userEmail })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }

  if (!updatedUser) {
    return res.status(404).json({ message: "Invalid email" });
  }

  if (userCode != updatedUser.confirmationCode) {
    return res.status(401).json({ message: "Invalid code" })
  } else {
    updatedUser.userStatus = "ACTIVE";

    try {
      await updatedUser.save();
      return res.status(200).json({ message: "Account is active!" });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
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

      try {
        await user.save();
      } catch (error) {
        return res.status(400).json({ message: "Something went wrong" })
      }

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

router.post("/logout/:id", async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.token = "a";

  try {
    await user.save();
    return res.status(201).json({ message: "Logged out!" })
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong." });
  }
})

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


{/* pls write backend of bring edit profile list */}
router.get('/BringProfileList/:id',async(req,res)=> {
});




router.patch("/editProfile/:id", async (req, res) => {
  let user;
  const userID = req.params.id;

  try {
    user = await User.findById(userID);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  if (req.body.newPassword != null) {
    if (req.body.currentPassword == null) {
      return res.status(400).json({ message: "Current password must be provided." });
    } else {
      if (req.body.newPassword == req.body.currentPassword) {
        return res.status(400).json({ message: "Passwords must not be the same." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hashedPassword;
    }
  }

  user.phoneNumber = req.body.phoneNumber;
  user.street = req.body.street;
  user.city = req.body.city;
  user.state = req.body.state;
  user.zipCode = req.body.zipCode;

  if (req.body.cardNumber != null) {
    const salt = await bcrypt.genSalt(10);
    const hashedCardNumber = await bcrypt.hash(req.body.cardNumber, salt);
    user.cardNumber = hashedCardNumber;
  }

  user.EXP = req.body.exp;

  try {
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/userEmail", async (req, res) => {
  let user;
  try {
    user = await User.findById(req.body.email);
    nodeoutlook.sendEmail({
      auth: {
        user: "aobooking@outlook.com",
        pass: "teamteama1"
      },
      from: 'aobooking@outlook.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: "<p>If you've lost your password or wish to reset it, click the link below</p>"
        + '<p><a href=http://localhost:3000/Auth>Reset password here!</a></p>',
      text: 'This is text version!',
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
    })

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

router.patch("/resetPassword/:email", async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const userEmail = req.params.email;

  let user;

  try {
    user = await User.findOne({ email: userEmail })
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not change password.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user.',
      404
    );
    return next(error);
  }

  if (newPassword == null || confirmPassword == null) {
    return res.status(401).json({ message: "Please enter both fields" });
  }

  if (newPassword != confirmPassword) {
    return res.status(401).json({
      message: "Passwords do not match"
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hashedPassword;

  try {
    await user.save();
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not change password.", 500
    );
    return next(err);
  }
})

router.post("/adminLogin", async (req, res) => {
  let admin;

  try {
    admin = await User.findOne({_id: req.body.id});
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }

  if (!admin) {
 return res.status(404).json({message: "Admin does not exist"})
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    admin.password
  );

  if (!validPassword) {
    return res.send({
      success: false,
      message: "Invalid password",
    });
  }

  if (admin.isAdmin == false) {
    return res.status(401).json({ message: "You are not an admin" });
  } else {
    const token = jwt.sign({ adminId: admin._id }, '$process.env.jwt_secret', {
      expiresIn: "5h",
    });
    admin.token = token;

    try {
      await admin.save();
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" })
    }

    res.send({
      success: true,
      message: "Admin logged in successful",
      data: token,
    });
  }
})

router.post("")

module.exports = router;
