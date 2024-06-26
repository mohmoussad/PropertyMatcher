const mongoose = require("mongoose");
const User = require("./models/User");
const Ad = require("./models/Ad");
const PropertyRequest = require("./models/PropertyRequest");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const connectDb = require("./config/connectDb");
const { logger } = require("./config/logger");
const { CustomError } = require("./middlewares/errorHandler");

let usersData = JSON.parse(fs.readFileSync("./db-sample/users.json", "utf8")).map((user) => {
  return {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };
});

let adsData = JSON.parse(fs.readFileSync("./db-sample/ads.json", "utf8"));
let propertyRequestsData = JSON.parse(fs.readFileSync("./db-sample/property_requests.json", "utf8"));

const insertSampleData = async () => {
  connectDb();
  logger.log("info", "Initializing db..");
  try {
    await User.deleteMany({});
    await Ad.deleteMany({});
    await PropertyRequest.deleteMany({});

    const admins = await User.insertMany(usersData.filter((user) => user.role == "ADMIN"));
    const clients = await User.insertMany(usersData.filter((user) => user.role == "CLIENT"));
    const agents = await User.insertMany(usersData.filter((user) => user.role == "AGENT"));

    const ads = await Ad.insertMany(
      adsData.map((ad) => {
        ad.createdBy = agents[0]._id;
        return ad;
      })
    );
    const propertyRequests = await PropertyRequest.insertMany(
      propertyRequestsData.map((propertyRequest) => {
        propertyRequest.createdBy = clients[0]._id;
        return propertyRequest;
      })
    );

    logger.log("info","Sample user data inserted");
  } catch (err) {
    logger.log("error", err);
    throw new CustomError("InternalServerError");
  }
};

insertSampleData();
