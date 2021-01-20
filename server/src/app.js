const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI,
  {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) return middlewares.errorHandler(error);
    console.log("Database Connected to " + process.env.MONGO_DB_NAME);
  }
);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server Active",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
