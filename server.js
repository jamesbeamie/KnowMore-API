const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//module imports
// routes imports
const devicesRoutes = require("./Routes/Devices/devices");
const userRoutes = require("./Routes/users/registration/User");
const loginRoutes = require("./Routes/users/login/Login");
const ratingRoutes = require("./Routes/rating/Rating");
const likeDislikeRoutes = require("./Routes/likesDislikes/likesDislikeRoutes");
const reviewRoutes = require("./Routes/reviews/reviewsRoutes");

const app = express();

//middlewares
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/devices", devicesRoutes);
app.use("/users", userRoutes);
app.use("/auth", loginRoutes);
app.use("/rating", ratingRoutes);
app.use("/liking", likeDislikeRoutes);
app.use("/reviews", reviewRoutes);

// server
mongoose
  .connect(
    // atlas
    // `${process.env.ATLAS_DB}`,
    //local DB
    `${process.env.LOCAL_DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected");
    app.listen(`${process.env.PORT}` || 5001);
  })
  .catch((err) => {
    console.log("Problem running the server");
    throw err;
  });
