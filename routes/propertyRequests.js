const express = require('express');
const router = express.Router();
const propertyRequestsController = require('../controllers/propertyRequestsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/', authenticate, authorize('CLIENT'), propertyRequestsController.createRequest);
router.put('/:id', authenticate, authorize('CLIENT'), propertyRequestsController.updateRequest);

module.exports = router;
