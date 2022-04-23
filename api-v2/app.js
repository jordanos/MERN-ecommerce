const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middlewares/errorHandler");

// Load Config File
dotenv.config({ path: "./.env" });

// Connect To Database
db()
  .then()
  .catch((e) => console.log(e));

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors());

// index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// api automatic documentaion
// Extended: https://swagger.io/specification/#infoObject
const { swaggerOptions, options } = require("./docs/swagger");

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Load Routes
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const { loginReq } = require("./middlewares/authMiddleware");
const { adminReq } = require("./middlewares/authorizationMiddleware");

const api_version = "/api/v1";

// Use Routes
app.use(`${api_version}/users`, usersRoute);
app.use(`${api_version}/auth`, authRoute);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
