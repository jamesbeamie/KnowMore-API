const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Initialize app
const app = express();

// Connecting to mongoDB

mongoose.connect("mongodb://localhost/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

// Pass in the folder that will keep the view
app.set("views", path.join(__dirname, "views"));
// Set view engine to pug
app.set("view engine", "pug");

// Home Route
app.get("/", (req, res) => {
  let postsArray = [
    {
      id: 1,
      title: "first",
      author: "James",
      body: "The article"
    },
    {
      id: 2,
      title: "firs",
      author: "James",
      body: "The article"
    },
    {
      id: 3,
      title: "firs",
      author: "James",
      body: "The article"
    }
  ];
  res.render("index", {
    title: "Hello",
    posts: postsArray
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
