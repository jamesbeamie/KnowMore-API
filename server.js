const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Models
let Post = require("./models/Posts");
console.log("Postsss", Post);
// Initialize app
const app = express();

// Connecting to mongoDB

mongoose.connect("mongodb://localhost/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
// Check connection success
db.on("open", () => {
  console.log("Connected to MongoDB");
});

// Check connection errors

db.on("error", err => {
  console.log(err);
});

// Pass in the folder that will keep the view
app.set("views", path.join(__dirname, "views"));
// Set view engine to pug
app.set("view engine", "pug");

// Home Route
app.get("/", (req, res) => {
  Post.find({}, (err, postsArray) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Hello",
        posts: postsArray
      });
    }
  });
});

// Add post

app.get("/posts/add", (req, res) => {
  res.render("add_post", {
    title: "Add Post"
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on 5000");
});
