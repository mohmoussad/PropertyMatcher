const mongoose = require("mongoose");
const { logger } = require("../config/logger");
const { CustomError } = require("../middlewares/errorHandler");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    logger.log("info", `Database connected, Host: ${connect.connection.host}, Db Name: ${connect.connection.name}`);
  } catch (error) {
    logger.log("error", error);
    throw new CustomError("InternalServerError");
  }
};

module.exports = connectDb;
