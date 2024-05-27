const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const controller = require("../utils/controller");

router.get('/', authenticate, authorize('ADMIN'), controller(statsController.getStats));

module.exports = router;
