const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/errorHandler");

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    throw new CustomError({ type: "AuthenticationError", message: "Authentication failed. Wrong credntials." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new CustomError({ type: "AuthenticationError", message: "Authentication failed. Wrong credntials." });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.send({ token });
};
