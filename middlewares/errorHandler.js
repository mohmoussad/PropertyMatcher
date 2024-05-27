const errDict = {
  ValidationError: { code: 400, defaultMessage: "The request data contains validation errors." },
  ConflictError: { code: 409, defaultMessage: "This identifier is already existed." },
  AuthenticationError: { code: 401, defaultMessage: "Authentication failed." },
  AuthorizationError: { code: 403, defaultMessage: "You are not authorized to access this resource." },
  NotFound: { code: 404, defaultMessage: "The requested resource was not found." },
  InternalServerError: { code: 500, defaultMessage: "An unexpected error occurred on the server." },
};

class CustomError extends Error {
  constructor(errProps) {
    super();
    this.type = errProps.type || "InternalServerError";
    this.code = errProps.code || errDict[this.type].code || 500;
    this.message =
      errProps.message || errDict[this.type].defaultMessage || "An unexpected error occurred on the server.";
    this.details = errProps.details || [];
  }
}

const errorHandler = (err, req, res, next) => {
  return res.status(err.code).json(err);
};

module.exports = { errorHandler, CustomError };
