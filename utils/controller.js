const { CustomError } = require("../middlewares/errorHandler");

const controller = (controllerFunction) => async (req, res, next) => {
  try {
    await controllerFunction(req, res, next);
  } catch (error) {
    if (!error.type) {
      return next(new CustomError({ type: "InternalServerError" }));
    }
    return next(error);
  }
};

module.exports = controller;
