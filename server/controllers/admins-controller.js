const HttpError = require("../models/HTTP-Error");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const addAdmin = (req, res, next) => {
    const {adminID, password} = req.body;
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

exports.addAdmin = addAdmin;