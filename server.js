//

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());

// routes
const postsRoutes = require("./Routes/post");

app.use("/people", postsRoutes);

// server
mongoose
  .connect(
    `mongodb+srv://james:glJOadOY0ALfbR06@cluster0-fhwxu.mongodb.net/homes-dev-db?retryWrites=true&w=majority`,
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
