const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const controller = require("../utils/controller");
const { validate, loginValidationRules, registerValidationRules, registerAdminValidationRules } = require("../middlewares/validate");

router.post("/login", validate(loginValidationRules), controller(authController.login));

module.exports = router;
