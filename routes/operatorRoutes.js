const express = require("express");
const router = express.Router();
const operatorController = require("../controllers/operatorController");

router.post("/signup", operatorController.signup);
router.post("/login", operatorController.login);

module.exports = router;
