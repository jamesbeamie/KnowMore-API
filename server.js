const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
require("dotenv/config");
const passport = require("passport");

// routes imports
const apiRoutes = require("./Routes");

// initialize app
const app = express();

//middlewares
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

// routes
app.use("/api/V1", apiRoutes);

// server
mongoose
  .connect(`${process.env.LOCAL_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
    app.listen(`${process.env.PORT}` || 5001);
  })
  .catch((err) => {
    console.log("Problem running the server");
    throw err;
  });
