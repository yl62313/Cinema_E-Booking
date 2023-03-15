const express = require("express");
const adminController = require("../controllers/admins-controller");
const router = express.Router();
const app = express();

router.post("/admin", adminController.addAdmin);

module.exports = router;
