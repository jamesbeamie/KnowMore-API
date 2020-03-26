//

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
const postsRoutes = require("./Routes/post");

app.use("/people", postsRoutes);

// server
mongoose
  .connect(
    // atlas
    // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    //local DB
    `${process.env.LOCAL_DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected");
    app.listen(5000);
  })
  .catch(err => {
    console.log("Shida");
    throw err;
  });
