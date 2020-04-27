let mongoose = require("mongoose");

// Posts Schema
const Schema = mongoose.Schema;

let postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  productionYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deviceImage: {
    type: String,
    require: true,
  },
  tags: [{ type: String, require: true }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DisLikes" }],
});

module.exports = mongoose.model("Device", postSchema);
