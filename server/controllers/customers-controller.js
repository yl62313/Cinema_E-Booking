const HttpError = require("../models/HTTP-Error")
const Customer = require("../models/Customer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const customerIndex = async (req, res, next) => {
  let customer;
  try {
    customer = Customer.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find customers", 500);
    return next(error);
  }

  if (!customer) {
    const error = new HttpError(
    "Could not find customers", 404);
    return next(error);
  }

  res.json(customer);
}

const getCustomerByID = async (req, res, next) => {
  const customerID = req.params.id;
  let customer;
  try {
    customer = await Customer.findById(customerID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not retrieve customer.", 500);
    return next(error);
  }

  if (!customer) {
    const error = new HttpError(
      "Could not find customer", 404);
    return next(error);
  }

  res.json(customer);
}
const login = (req, res, next) => {
  const { email, password } = req.body;
  Customer.findOne({ email: email })
    .then(customer => {
      if (!customer) {
        return res.status(401).json({
          message: "Sign-in failed"
        });
      }
      bcrypt.compare(password, customer.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Sign-in utomost failed"
          });
        }
        if (result) {
          if (customer.status == "INACTIVE") {
            return res.status(401).json({
              message: "Account is inactive."
            });
          } else if (customer.status == "SUSPENDED") {
            return res.status(401).json({
              message: "Account is suspended"
            });
          } else {
            const token = jwt.sign({
              email: customer.email,
              userId: customer.customerID
            }, '${process.env.JWT_SECRET_KEY}', { expiresIn: "1d" });
            return res.status(200).json({
              message: "Signed in!",
              token: token
            });
          }
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

const resetPassword = async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;
  const customerID = req.params.id;

  let customer;

  try {
    customer = Customer.findById(customerID)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not change password.',
      500
    );
    return next(error);
  }

  if (!customer) {
    const error = new HttpError(
      'Could not find customer.',
      404
    );
    return next(error);
  }
  console.log(customerID);
  if (newPassword != confirmNewPassword) {
    return res.status(401).json({
      message: "Passwords do not match"
    });
  }

  bcrypt.hash(newPassword, 10, async (err, newPassword) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      customer.password = newPassword;
      try {
        await customer.save();
        res.status(201).json({ newPassword: customer.password });
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not change password.',
          500
        );
        console.log(err.message);
        return next(error);
      }
    }
  })
}

const logout = (req, res) => {

}

exports.login = login;
exports.resetPassword = resetPassword;
exports.logout = logout;
exports.customerIndex = customerIndex;
exports.getCustomerByID = getCustomerByID;
