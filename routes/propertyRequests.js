const express = require("express");
const router = express.Router();
const propertyRequestsController = require("../controllers/propertyRequestsController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const controller = require("../utils/controller");
const {
  validate,
  adAndRequestsCreateValidationRules,
  updatePropertyRequestValidationRules,
} = require("../middlewares/validate");

router.post(
  "/",
  authenticate,
  authorize("CLIENT"),
  validate(adAndRequestsCreateValidationRules),
  controller(propertyRequestsController.createPropertyRequest)
);
router.put(
  "/:id",
  authenticate,
  authorize("CLIENT"),
  validate(updatePropertyRequestValidationRules),
  controller(propertyRequestsController.updatePropertyRequest)
);

module.exports = router;
