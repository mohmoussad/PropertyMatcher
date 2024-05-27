const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./db/connectDb");

require("dotenv").config();
connectDb();

const app = express();

app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const propertyRequestRoutes = require("./routes/propertyRequests");
const adRoutes = require("./routes/ads");
const statsRoutes = require("./routes/stats");

app.use("/api/auth", authRoutes);
app.use("/api/propertyRequests", propertyRequestRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/admin/stats", statsRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Up and Running!" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
