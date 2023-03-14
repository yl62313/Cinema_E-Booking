const HttpError = require("../models/HTTP-Error");
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    const { email, password, firstName, lastName, phoneNumber} = req.body;
    Customer.find({ email: email })
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email taken"
          });
        } else {
          bcrypt.hash(password, 10, async (err, password) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const createdCustomer = new Customer({
                email,
                password,
                firstName,
                lastName,
                phoneNumber
              });
              try {
                await createdCustomer.save();
              } catch (err) {
                const error = new HttpError(
                  'Creating customer failed, please try again.',
                  500
                );
                console.log(err.message);
                return next(error);
              }
              res.status(201).json({ customer: createdCustomer });
            }
          })
        }
      })
      .catch();
  };

  

  exports.register = register;
  
