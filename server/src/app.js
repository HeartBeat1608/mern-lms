const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

const api = require("./api");
app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// database init
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_NAME,
  })
  .then((res) => {
    console.log(`Mongoose Connected : ${res.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.log(`Mongoose Failed : ${err.message}`);
  });

module.exports = app;
