const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//module imports
// routes imports
const postsRoutes = require("./Routes/post");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/people", postsRoutes);

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
    app.listen(`${process.env.PORT}` || 5000);
  })
  .catch(err => {
    console.log("Shida");
    throw err;
  });
