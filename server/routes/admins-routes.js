const express = require("express");
const adminController = require("../controllers/admins-controller");
const router = express.Router();
const app = express();

router.post("/addAdmin", adminController.addAdmin);
router.post("/adminLogin", adminController.adminLogin);

module.exports = router;
