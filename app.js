const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/connectDb");
const swaggerUi = require("swagger-ui-express");
const { errorHandler, CustomError } = require("./middlewares/errorHandler");

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

const swaggerDocument = JSON.parse(fs.readFileSync("swagger.json", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "Up and Running!" });
});

app.use((req, res, next) => {
  next(new CustomError("NotFound"));
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
