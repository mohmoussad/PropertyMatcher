const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("info", `Database connected, Host: ${connect.connection.host}, Db Name: ${connect.connection.name}`);
  } catch (error) {
    console.error("info", error);
  }
};

module.exports = connectDb;