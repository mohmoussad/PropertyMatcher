const express = require('express');
const router = express.Router();
const propertyRequestsController = require('../controllers/propertyRequestsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const controller = require("../utils/controller");

router.post('/', authenticate, authorize('CLIENT'), controller(propertyRequestsController.createRequest));
router.put('/:id', authenticate, authorize('CLIENT'), controller(propertyRequestsController.updateRequest));

module.exports = router;
