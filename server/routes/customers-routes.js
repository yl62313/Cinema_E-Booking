const express = require("express");
const auth = require ("../../middleware/auth");
const customerController = require("../controllers/customers-controller");
const router = express.Router();

router.get("/", customerController.customerIndex);
router.get("/:id", customerController.getCustomerByID);
router.post("/login", customerController.login);
router.patch("/:id", customerController.resetPassword);
router.get("/logout", auth, customerController.logout);

module.exports = router;