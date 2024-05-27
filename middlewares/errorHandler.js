const errDict = {
  ValidationError: { code: 400, defaultMessage: "The request data contains validation errors." },
  AuthenticationError: { code: 401, defaultMessage: "Authentication failed. Please log in again." },
  AuthorizationError: { code: 403, defaultMessage: "You are not authorized to access this resource." },
  NotFound: { code: 404, defaultMessage: "The requested resource was not found." },
  InternalServerError: { code: 500, defaultMessage: "An unexpected error occurred on the server." },
};

class CustomError extends Error {
  constructor(type, code, message) {
    super();
    this.type = type || "InternalServerError";
    this.code = code || errDict[this.type].code || 500;
    this.message = message || errDict[this.type].defaultMessage ||"An unexpected error occurred on the server.";
  }
}

const errorHandler = (err, req, res, next) => {
  return res.status(err.code).json(err);
};

module.exports = { errorHandler, CustomError };
