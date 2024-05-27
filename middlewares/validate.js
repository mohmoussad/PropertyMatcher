const { body, validationResult } = require("express-validator");
const { CustomError } = require("../middlewares/errorHandler");

const adAndRequestsCreateValidationRules = [
  body("propertyType")
    .notEmpty()
    .withMessage("Property Type is required")
    .isIn(["VILLA", "HOUSE", "LAND", "APARTMENT"])
    .withMessage("Invalid property type"),
  body("area").notEmpty().withMessage("Area Type is required").isNumeric().withMessage("Area must be a number"),
  body("price").notEmpty().withMessage("Price Type is required").isNumeric().withMessage("Price must be a number"),
  body("city").notEmpty().withMessage("City is required"),
  body("district").notEmpty().withMessage("District is required"),
  body("description").notEmpty().withMessage("Description is required"),
];
const loginValidationRules = [
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
const registerValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").notEmpty().withMessage("Role is required").isIn(["CLIENT", "AGENT"]).withMessage("Invalid role"),
  body("status").isIn(["ACTIVE", "DELETED"]).withMessage("Invalid status"),
];
const registerAdminValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("status").isIn(["ACTIVE", "DELETED"]).withMessage("Invalid status"),
];
const updatePropertyRequestValidationRules = [
  body("area").isNumeric().withMessage("Area must be a number"),
  body("price").isNumeric().withMessage("Price must be a number"),
];

const validate = (schemas) => {
  return async (req, res, next) => {
    try {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const extractedErrors = errors.array().map((err) => ({ [err.path]: err.msg }));
      throw new CustomError({ type: "ValidationError", details: [extractedErrors] });
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  validate,
  adAndRequestsCreateValidationRules,
  loginValidationRules,
  registerValidationRules,
  registerAdminValidationRules,
  updatePropertyRequestValidationRules,
};
