const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', authenticate, authorize('ADMIN'), statsController.getStats);

module.exports = router;
