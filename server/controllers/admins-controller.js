const HttpError = require("../models/HTTP-Error");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addAdmin = (req, res, next) => {
  const { adminID, password } = req.body;
  bcrypt.hash(password, 10, async (err, password) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const createdAdmin = new Admin({
        adminID,
        password
      });
      try {
        createdAdmin.adminID = createdAdmin._id.toString();
        await createdAdmin.save();
      } catch (err) {
        const error = new HttpError(
          'Creating admin failed, please try again.',
          500
        );
        console.log(err.message);
        return next(error);
      }
      res.status(201).json({ admin: createdAdmin });
    }
  })
}

const adminLogin = (req, res, next) => {
  const { adminID, password } = req.body;
  Admin.findOne({ adminID: adminID })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({
          message: "Sign-in failed"
        });
      }
      bcrypt.compare(password, admin.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Sign-in failed"
          });
        }
        if (result) {
          const token = jwt.sign({
            email: admin.email,
            adminId: admin.adminID
          }, '${process.env.JWT_SECRET_KEY}');
          return res.status(200).json({
            message: "Signed in!",
            token: token
          });
        }
        res.status(401).json({
          message: "Sign-in failed"
        });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.addAdmin = addAdmin;
exports.adminLogin = adminLogin;