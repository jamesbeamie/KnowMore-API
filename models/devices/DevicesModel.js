let mongoose = require("mongoose");

// Posts Schema
const Schema = mongoose.Schema;

let deviceSchema = new Schema({
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
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Device", deviceSchema);
