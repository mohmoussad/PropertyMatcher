const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const controller = require("../utils/controller");
const authorize = require("../middlewares/authorize");
const { validate, loginValidationRules, registerValidationRules, registerAdminValidationRules } = require("../middlewares/validate");

router.post("/register", validate(registerValidationRules), controller(authController.register));
router.post("/register/admin", authorize("ADMIN"), validate(registerAdminValidationRules), controller(authController.registerAdmin));
router.post("/login", validate(loginValidationRules), controller(authController.login));

module.exports = router;
