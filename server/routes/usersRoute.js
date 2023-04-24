const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const EmailAdapter = require('../adapter/adapter');

const emailAdapter = new EmailAdapter({
  user: 'csci4050@outlook.com',
  pass: 'teamteama1'
});


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

    if (req.body.sub) {
      newUser.isSubscribed = true;
    }


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

    const emailOptions = {
      from: 'csci4050@outlook.com',
      to: req.body.email,
      subject: 'Verification Email',
      html: '<p>Thank you for registering with us. Before you can proceed,' +
        'please enter the given verification code: </p>' + code
        + '<p><a href=http://localhost:3000/Auth> Click here to verify</a></p>',
      text: 'This is text version!'
    };

    await emailAdapter.sendMail(emailOptions);



    // nodeoutlook.sendEmail({
    //   auth: {
    //     user: "csci4050@outlook.com",
    //     pass: "teamteama1"
    //   },
    //   from: 'csci4050@outlook.com',
    //   to: req.body.email,
    //   subject: 'Verification Email',
    //   html: '<p>Thank you for registering with us. Before you can proceed, please enter the given verification code: </p>' + code
    //     + '<p><a href=http://localhost:3000/Auth> Click here to verify</a></p>',
    //   text: 'This is text version!',
    //   onError: (e) => console.log(e),
    //   onSuccess: (i) => console.log(i)
    // });


  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/Auth", async (req, res) => {
  const user = await User.findOne({ email: req.body.email, confirmationCode: req.body.code });
  if (user) {
    // Update the user's userStatus to "ACTIVE"
    user.userStatus = "ACTIVE";
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User verified',
      user: user
    });
  } else {
    return res.send({
      success: false,
      message: "invalid email or code",
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
      return res.send({
        success: false,
        message: "Account is inactive."
      })
    } else if (user.userStatus == "SUSPENDED") {
      return res.send({
        success: false,
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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
  }
})


router.get('/get-profile-by-email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.send({
      success: true,
      message: "User fetched",
      data: user,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.patch("/editProfile/:email", async (req, res) => {
  let user;
  const userEmail = req.params.email;

  try {
    user = await User.findOne({ email: userEmail });
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
      return res.send({
        success: false,
        message: "Current password must be provided"
      });
    } else {
      const samePassword = await bcrypt.compare(req.body.currentPassword, user.password);

      if (!samePassword) {
        return res.send({
          success: false,
          message: "Current password is not correct"
        })
      }
      if (req.body.newPassword == req.body.currentPassword) {
        return res.send({
          success: false,
          message: "Passwords must not be the same"
        });
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

  if (req.body.sub) user.isSubscribed = true;
  else user.isSubscribed = false;

  try {
    await user.save();
    res.send({
      success: true,
      message: "Profile successfully updated"
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/sendResetEmail", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        mesage: "Email is invalid"
      })
    }

    const emailOptions = {
      from: 'csci4050@outlook.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: "<p>If you've lost your password or wish to reset it, click the link below</p>"
        + '<p><a href="http://localhost:3000/resetPassword/' + encodeURIComponent(req.body.email) + '">Reset password here!</a></p>',
      text: 'This is text version!',
    };

    await emailAdapter.sendMail(emailOptions);

    return res.send({
      success: true,
      message: "Reset link sent to your email",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
})

router.patch("/resetPassword/:email", async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const userEmail = req.params.email;

  let user;

  try {
    user = await User.findOne({ email: userEmail })
  } catch (error) {
    return res.send({
      success: false,
      message: error.mesage
    });
  }

  if (!user) {
    return res.send({
      success: false,
      message: "User not found"
    })
  }

  if (newPassword != confirmPassword) {
    return res.send({
      success: false,
      message: "Passwords do not match"
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hashedPassword;

  try {
    await user.save();
    res.send({
      success: true,
      message: "Password successfully reset"
    })
  } catch (error) {
    return res.send({
      success: false,
      message: error.mesage
    })
  }
})

router.post("/adminLogin", async (req, res) => {
  let admin;

  try {
    admin = await User.findOne({ _id: req.body.id });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }

  if (!admin) {
    return res.send({
      success: false,
      message: "Admin does not exist",
    })
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
    return res.send({
      success: false,
      message: "You are not an admin"
    });
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


router.get('/bring-user', async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successful",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post('/delete-user', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId)
    res.send({
      success: true,
      message: "User deleted"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

router.post("/update-user", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, req.body);
    res.send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get('/current-user', async (req, res) => {
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

router.post("/get-user-by-id", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});







module.exports = router;
