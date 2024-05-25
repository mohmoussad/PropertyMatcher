const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/', authenticate, authorize('AGENT'), adsController.createAd);
router.get('/:id/matches', authenticate, authorize('AGENT'), adsController.matchRequests);

module.exports = router;
