const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
require("dotenv/config");
const passport = require("passport");

//module imports
// routes imports
const devicesRoutes = require("./Routes/Devices/devices");
const userRoutes = require("./Routes/users/registration/User");
const loginRoutes = require("./Routes/users/login/Login");
const ratingRoutes = require("./Routes/rating/Rating");
const likeDislikeRoutes = require("./Routes/Devices/likeDislikeDevice");
const reviewRoutes = require("./Routes/reviews/reviewsRoutes");
const pwdResetRoutes = require("./Routes/users/pwdReset/passwordReset");
const favouriteRoutes = require("./Routes/Devices/favouriteDevice");
const inviteRoutes = require("./Routes/invite/invite");
// refactored routes with versioning
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
// app.use("/devices", devicesRoutes);
// app.use("/users", userRoutes);
// app.use("/auth", loginRoutes);
// app.use("/rating", ratingRoutes);
// app.use("/reviews", reviewRoutes);
// app.use("/liking", likeDislikeRoutes);
// app.use("/password-reset", pwdResetRoutes);
// app.use("/favourites", favouriteRoutes);
// app.use("/invite", inviteRoutes);
// Versioned
app.use("/api/V1", apiRoutes);

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
