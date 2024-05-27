const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const controller = require("../utils/controller");

router.post('/login', controller(authController.login));

module.exports = router;
