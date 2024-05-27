const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const controller = require("../utils/controller");

router.post('/', authenticate, authorize('AGENT'), controller(adsController.createAd));
router.get('/:id/matches', authenticate, authorize('AGENT'), controller(adsController.matchRequests));

module.exports = router;
