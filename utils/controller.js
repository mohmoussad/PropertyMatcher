const { CustomError } = require("../middlewares/errorHandler");

const controller = (controllerFunction) => async (req, res, next) => {
  try {
    await controllerFunction(req, res, next);
  } catch (error) {
    if (!error.title) {
      return next(new CustomError("InternalServerError"));
    }
    return next(error);
  }
};

module.exports = controller;
