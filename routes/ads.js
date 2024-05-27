const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { validate, adAndRequestsCreateValidationRules } = require('../middlewares/validate');
const controller = require("../utils/controller");

router.post('/', authenticate, authorize('AGENT'), validate(adAndRequestsCreateValidationRules) ,controller(adsController.createAd));
router.get('/:id/matches', authenticate, authorize('AGENT'), controller(adsController.matchRequests));

module.exports = router;
