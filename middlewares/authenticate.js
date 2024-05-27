const jwt = require('jsonwebtoken');
const { CustomError } = require("./errorHandler");


function authenticate(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) throw new CustomError({ type: "AuthenticationError", message: "Authentication failed. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    throw new CustomError({ type: "AuthenticationError", message: "Authentication failed. Invalid token." });
  }
}

module.exports = authenticate;
