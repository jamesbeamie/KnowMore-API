let mongoose = require("mongoose");

// Posts Schema

let postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

let posts = (module.exports = mongoose.model("Post", postSchema));
