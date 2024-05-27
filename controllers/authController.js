const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/errorHandler");

exports.register = async (req, res) => {
  const { name, phone, password, role, status } = req.body;

  if (role.toLowerCase() == "admin") {
    throw new CustomError({ type: "AuthorizationError" });
  }

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw new CustomError({ type: "ConflictError" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    phone,
    password: hashedPassword,
    role: role.toUpperCase(),
    status,
  });

  await user.save();

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

  res.status(201).send({ token });
};

exports.registerAdmin = async (req, res) => {
  const { name, phone, password, status } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw new CustomError({ type: "ConflictError" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    phone,
    password: hashedPassword,
    role: "ADMIN",
    status,
  });

  await user.save();

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

  res.status(201).send({ token });
};

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
